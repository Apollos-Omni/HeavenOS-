import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function LegacyFinalWords() {
  const user = useAuthStore(state => state.user);
  const [finalWords, setFinalWords] = useState('');

  const saveFinalWords = async () => {
    await updateDoc(doc(db, 'users', user.uid, 'legacy'), {
      finalReflection: finalWords,
    });
    setFinalWords('');
  };

  return (
    <View className="bg-black p-6 h-full">
      <Text className="text-purple-500 text-3xl mb-4">🪞 Legacy Final Message</Text>
      <TextInput
        value={finalWords}
        onChangeText={setFinalWords}
        placeholder="What would you say if this was your last message?"
        className="bg-white p-3 rounded text-black mb-4"
        multiline
        numberOfLines={6}
      />
      <Button title="Store Final Reflection" onPress={saveFinalWords} color="#8b5cf6" />
    </View>
  );
}
