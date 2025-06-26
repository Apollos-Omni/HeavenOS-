import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { generateNarrative } from '../utils/narrativeGenerator';
import useAuthStore from '../store/useAuthStore';

export default function Narrative() {
  const user = useAuthStore(state => state.user);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const newNarrative = await generateNarrative(user.uid);
    setStory(newNarrative);
    setLoading(false);
  };

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-purple-400 text-3xl mb-4">📖 Your HeavenOS Story</Text>
      <Button title="Generate My Narrative" onPress={handleGenerate} color="#9333ea" />
      {loading && <Text className="text-white mt-4">Generating your legend...</Text>}
      {story && <Text className="text-white mt-6">{story}</Text>}
    </ScrollView>
  );
}
