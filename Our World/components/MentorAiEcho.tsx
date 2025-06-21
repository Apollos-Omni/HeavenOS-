import React from 'react';
import { View, Text, Image } from 'react-native';
import useMentorAi from '../hooks/useMentorAi';

export default function MentorAiEcho() {
  const { message, avatar } = useMentorAi();

  return (
    <View className="p-4 bg-black items-center">
      <Image
        source={{ uri: avatar }}
        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12 }}
      />
      <Text className="text-white text-lg text-center italic">"{message}"</Text>
    </View>
  );
}
