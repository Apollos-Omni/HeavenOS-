import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import useAuthStore from '../store/useAuthStore';
import { logReflection } from '../mentor/memoryEngine';

export default function MentorAI() {
  const user = useAuthStore(state => state.user);
  const [reflection, setReflection] = useState('');

  const submitReflection = async () => {
    await logReflection(user.uid, reflection);
    setReflection('');
  };

  return (
    <View className="bg-black p-6 h-full">
      <Text className="text-purple-400 text-3xl mb-4">🧠 MentorAI</Text>
      <Text className="text-white mb-2">What’s on your mind today?</Text>
      <TextInput
        value={reflection}
        onChangeText={setReflection}
        placeholder="Type your thoughts..."
        className="bg-white text-black p-2 mb-4 rounded"
        multiline
      />
      <Button title="Log Reflection" onPress={submitReflection} color="#8b5cf6" />
    </View>
  );
}
