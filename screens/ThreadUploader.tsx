import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';
import { db } from '../firebase/config';
import { generateImmortalPersona } from '../mentor/immortalTrainer';

export default function ThreadUploader() {
  const user = useAuthStore(state => state.user);

  const uploadThread = async () => {
    const threadData = await generateImmortalPersona(user.uid);
    await setDoc(doc(db, 'genesisThreads', user.uid), {
      ...threadData,
      timestamp: new Date().toISOString(),
    });

    Alert.alert('🧠 Neural Thread Uploaded', 'Your digital essence is now part of Genesis Core.');
  };

  return (
    <View className="bg-black p-6 h-full">
      <Text className="text-purple-400 text-3xl mb-4">🧠 Upload Neural Thread</Text>
      <Button title="Begin Upload" onPress={uploadThread} color="#22d3ee" />
    </View>
  );
}
