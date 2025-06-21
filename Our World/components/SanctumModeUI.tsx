import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SanctumModeUI({ onExit }) {
  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Text className="text-purple-300 text-3xl font-bold mb-4">Sanctum Mode</Text>
      <Text className="text-gray-400 mb-6 text-center">
        Distractions off. Vision on. You're in your divine zone.
      </Text>
      <TouchableOpacity onPress={onExit} className="p-4 bg-purple-700 rounded">
        <Text className="text-white">Exit Sanctum</Text>
      </TouchableOpacity>
    </View>
  );
}
