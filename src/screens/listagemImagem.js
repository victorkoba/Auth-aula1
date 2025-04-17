import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import s3 from '../../awsConfig';

const BUCKET_NAME = 'bucket-storage-senai-30';
const FOLDER = 'imagens/';

export default function ListarImagens({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await s3
          .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: FOLDER })
          .promise();

        const imageFiles = response.Contents.filter((file) =>
          file.Key.match(/\.(jpg|jpeg|png)$/i)
        );

        const imageURLs = imageFiles.map((file) => ({
          name: file.Key.split('/').pop(),
          url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
        }));

        setImages(imageURLs);
      } catch (error) {
        console.error('Erro ao listar imagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imagens do Bucket</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {images.map((img, index) => (
            <View key={index} style={styles.imageCard}>
              <Image source={{ uri: img.url }} style={styles.image} />
              <Text style={styles.imageName}>{img.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  imageCard: {
    width: 150,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  imageName: {
    padding: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});
