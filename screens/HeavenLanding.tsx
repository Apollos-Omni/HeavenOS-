import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeavenLanding() {
  const navigation = useNavigation();

  return (
    <ScrollView className="bg-gradient-to-b from-black via-purple-900 to-black p-6 h-full">
      <View className="items-center mb-6">
        <Image
          source={{ uri: 'https://cloud.heavenos.com/logo.png' }}
          style={{ width: 120, height: 120 }}
        />
        <Text className="text-white text-4xl font-bold mt-4">HeavenOS</Text>
        <Text className="text-purple-300 text-lg mt-2 text-center px-4">
          The Operating System for a Better World.
        </Text>
      </View>

      <View className="bg-white/10 rounded-lg p-4 mb-4">
        <Text className="text-white text-xl font-semibold mb-2">Features</Text>
        <Text className="text-white text-base">🌍 Vision Board</Text>
        <Text className="text-white text-base">📈 Karma Tracker</Text>
        <Text className="text-white text-base">💬 Global Feed</Text>
        <Text className="text-white text-base">🏠 Homeless to Homeowner</Text>
        <Text className="text-white text-base">🪙 HeavenCoin Protocol</Text>
      </View>

      <TouchableOpacity
        className="bg-purple-600 rounded-md py-3 mt-4 items-center"
        onPress={() => navigation.navigate('VisionBoard')}
      >
        <Text className="text-white text-lg font-bold">Launch HeavenOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white/10 rounded-md py-3 mt-3 border border-purple-500 items-center"
        onPress={() => navigation.navigate('HeavenCoin')}
      >
        <Text className="text-purple-300 text-lg">View HeavenCoin Protocol</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
