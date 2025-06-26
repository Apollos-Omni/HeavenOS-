import React from 'react';
import { View, Text, Button } from 'react-native';
import BreathSyncBar from '../components/BreathSyncBar'; // assuming this is your custom component
import { useNavigation } from '@react-navigation/native';

export default function Sanctum() {
  const navigation = useNavigation();

  return (
    <View className="bg-gradient-to-b from-black to-purple-950 flex-1 justify-center items-center p-6">
      <Text className="text-white text-3xl mb-6 font-semibold">
        Welcome to Sanctum
      </Text>
      <Text className="text-gray-300 text-center px-8">
        This is your sacred space. No feed. No messages. Just you, your dream, and the silence in between.
      </Text>
      
      <BreathSyncBar />

      <Text className="text-indigo-300 mt-8 italic text-center">
        “Peace is the protocol.” – MentorAI
      </Text>

      <View className="mt-10 w-full">
        <Button
          title="Begin Intention Setting"
          onPress={() => navigation.navigate('IntentionScreen')}
          color="#8b5cf6"
        />
      </View>
    </View>
  );
}
