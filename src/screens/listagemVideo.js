import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Video } from 'expo-av';
import s3 from '../../awsConfig';

const bucketName = 'bucket-storage-senai-30';
const prefix = 'videos/'; // Caminho padrão dos vídeos no bucket

export default function ListarVideos({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);

    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: prefix,
        })
        .promise();

      const videoFiles = response.Contents?.filter(
        (file) => file.Size > 0 && file.Key.match(/\.(mp4|mov|webm|mkv)$/i)
      );

      const videoUrls =
        videoFiles?.map((file) => ({
          key: file.Key,
          name: file.Key.split('/').pop(),
          url: `https://${bucketName}.s3.amazonaws.com/${encodeURI(file.Key)}`,
        })) || [];

      setVideos(videoUrls);
    } catch (error) {
      console.error('Erro ao carregar vídeos: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vídeos do Bucket</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : videos.length === 0 ? (
        <Text style={styles.noVideos}>Nenhum vídeo encontrado.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {videos.map((video, index) => (
            <View key={index} style={styles.videoCard}>
              <Video
                source={{ uri: video.url }}
                useNativeControls
                resizeMode="contain"
                style={styles.video}
              />
              <Text style={styles.videoName}>{video.name}</Text>
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
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  videoCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    padding: 10,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  videoName: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  noVideos: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
