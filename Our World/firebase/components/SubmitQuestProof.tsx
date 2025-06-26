import React, { useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { db, storage } from '../firebase/config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import useAuthStore from '../store/useAuthStore';

export default function SubmitQuestProof({ route }) {
  const { questId } = route.params;
  const user = useAuthStore(state => state.user);
  const [imageUri, setImageUri] = useState(null);

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    if (!result.canceled) setImageUri(result.uri);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(imageUri);
      const blob = await res.blob();
      const imageRef = ref(storage, `questProofs/${user.uid}_${questId}.jpg`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      await setDoc(doc(db, `completedQuests/${user.uid}_${questId}`), {
        userId: user.uid,
        questId,
        proofType: "photo",
        proofURL: imageUrl,
        timestamp: new Date().toISOString(),
        karmaAwarded: 15,
        xpAwarded: 50,
        mentorVerified: false
      });

      await updateDoc(doc(db, 'userRoles', user.uid), {
        xp: 100, // Simulate update (replace with actual XP logic)
        karma: 50
      });

      Alert.alert('Success', 'Quest submitted!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">📤 Submit Quest Proof</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: '100%', height: 200 }} />}
      <Button title="Select Proof Image" onPress={handleUpload} />
      <View style={{ marginTop: 10 }}>
        <Button title="Submit Quest" onPress={handleSubmit} color="#16a34a" />
      </View>
    </View>
  );
}
