import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function NeuralMirrorViewer({ userId }) {
  const [mirror, setMirror] = useState(null);

  useEffect(() => {
    const fetchMirror = async () => {
      const snap = await getDoc(doc(db, 'neuralMirrors', userId));
      if (snap.exists()) setMirror(snap.data());
    };
    fetchMirror();
  }, []);

  if (!mirror) return <Text className="text-white">Loading Neural Mirror...</Text>;

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-purple-300 text-xl font-bold">🪞 Your Neural Mirror</Text>
      <Text className="text-white mt-2 italic">AI Reflection:</Text>
      <Text className="text-white mb-4">{mirror.aiReflection}</Text>

      {mirror.memoryThreads.map((m, i) => (
        <View key={i} className="mb-4 bg-gray-800 p-3 rounded-xl">
          <Text className="text-yellow-400 font-bold">{m.title}</Text>
          <Text className="text-white">{m.summary}</Text>
        </View>
      ))}

      {mirror.legacyMessage && (
        <View className="mt-6">
          <Text className="text-white text-lg">🎤 Final Message:</Text>
          <Text className="text-blue-400 underline">{mirror.legacyMessage.url}</Text>
        </View>
      )}
    </ScrollView>
  );
}
