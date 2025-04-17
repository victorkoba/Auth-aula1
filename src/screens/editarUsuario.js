import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { auth } from '../../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { EmailAuthProvider, updateEmail, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import s3 from '../../awsConfig';

const S3_BUCKET = 'bucket-storage-senai-30';

const EditarUser = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagemUrl, setImagemUrl] = useState('');

  const db = getFirestore();

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        alert('Erro', 'Usuário não está autenticado.');
        return;
      }
  
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const data = userSnap.data();
        setNome(data.nome);
        setEmail(data.email);
        setImagemUrl(data.foto);
      } else {
        alert('Erro', 'Dados do usuário não encontrados.');
      }
    } catch (error) {
      alert('Erro ao carregar dados', error.message);
    }
  };  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const uploadToAWS = async () => {
    if (!imagem) return imagemUrl;

    try {
      const response = await fetch(imagem);
      const blob = await response.blob();
      const filename = `${uuid.v4()}.jpg`;
      const key = `perfil_imagem/${auth.currentUser.uid}/${filename}`;

      const uploadParams = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: blob,
        ContentType: 'image/jpeg',
      };

      const result = await s3.upload(uploadParams).promise();
      return result.Location;
    } catch (error) {
      alert('Erro no upload da imagem', error.message);
      return '';
    }
  };

  const editarUsuario = async () => {
    try {
      const user = auth.currentUser;

      if (!senha) {
        alert('Erro', 'Para atualizar o usuário, a senha atual é necessária.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, senha);
      await reauthenticateWithCredential(user, credential);

      const imageUrl = await uploadToAWS();

      if (email !== user.email) {
        await updateEmail(user, email);
      }

      await updatePassword(user, senha);

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        nome,
        email,
        foto: imageUrl,
      });

      alert('Sucesso', 'Usuário atualizado com sucesso!');
    } catch (error) {
      alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Perfil</Text>

      <Pressable onPress={pickImage} style={styles.imageContainer}>
        {imagem || imagemUrl ? (
          <Image source={{ uri: imagem || imagemUrl }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Selecionar Foto</Text>
        )}
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha nova"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable style={styles.botao} onPress={editarUsuario}>
        <Text style={styles.botaoTexto}>Salvar Alterações</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 120,
    color: '#777',
    fontSize: 16,
  },
});

export default EditarUser;