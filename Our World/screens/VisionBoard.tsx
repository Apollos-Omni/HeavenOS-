import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';
import { pickAndUploadImage } from '../utils/uploadImage';
import { incrementKarma, incrementInfluence } from '../utils/karmaEngine';
import { canModerate } from '../utils/permissions';

export default function VisionBoard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [visions, setVisions] = useState<any[]>([]);
  const user = useAuthStore(state => state.user);

  // Fetch visions on mount and after each submission/deletion
  const fetchVisions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'visions'));
      const fetchedVisions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVisions(fetchedVisions);
    } catch (error: any) {
      Alert.alert('Error fetching visions', error.message);
    }
  };

  useEffect(() => {
    fetchVisions();
  }, []);

  // Submit new vision with optional image upload and karma rewards
  const handleSubmit = async () => {
    try {
      let imageUrl = null;

      if (image) {
        imageUrl = await pickAndUploadImage('visions');
      }

      await addDoc(collection(db, 'visions'), {
        title,
        description,
        imageUrl,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });

      // 🚀 Reward user
      await incrementKarma(user.uid, 10);
      await incrementInfluence(user.uid, 5);

      Alert.alert('Success', 'Your vision has been posted!');
      setTitle('');
      setDescription('');
      setImage(null);

      // Refresh list
      fetchVisions();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  // Delete post if user has permission
  const handleDelete = async (postId: string) => {
    if (canModerate(user.role)) {
      try {
        const postRef = doc(db, 'visions', postId);
        await deleteDoc(postRef);
        setVisions(prev => prev.filter(post => post.id !== postId));
        Alert.alert('Deleted', 'Vision post deleted.');
      } catch (error: any) {
        Alert.alert('Error deleting post', error.message);
      }
    } else {
      Alert.alert('Unauthorized', 'You do not have permission to delete this post.');
    }
  };

  // Select and upload image for vision
  const handleSelectImage = async () => {
    try {
      const uploadedImage = await pickAndUploadImage('visions');
      if (uploadedImage) setImage(uploadedImage);
    } catch (error: any) {
      Alert.alert('Image Upload Failed', error.message);
    }
  };

  return (
    <ScrollView
      className="bg-black p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text className="text-white text-2xl mb-4">Share Your Vision</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="bg-white mb-2 p-2 rounded"
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        className="bg-white mb-4 p-2 rounded"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      <Button title="Select Image" onPress={handleSelectImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}

      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <Button title="Submit Vision" onPress={handleSubmit} color="#a855f7" />
      </View>

      <Text className="text-white text-xl mb-2">Your Visions</Text>

      <FlatList
        data={visions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-800 p-4 my-2 rounded">
            <Text className="text-white text-lg font-bold">{item.title}</Text>
            <Text className="text-white mb-2">{item.description}</Text>
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 8 }}
                resizeMode="cover"
              />
            )}
            {canModerate(user.role) && (
              <Button
                title="Delete Post"
                onPress={() => handleDelete(item.id)}
                color="red"
              />
            )}
          </View>
        )}
        scrollEnabled={false} // Scroll handled by ScrollView parent
      />
    </ScrollView>
  );
}
