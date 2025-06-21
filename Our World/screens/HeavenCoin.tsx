import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function HeavenCoin() {
  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-purple-500 text-3xl font-bold mb-4">HeavenCoin Protocol</Text>

      <Text className="text-white mb-4">
        HeavenCoin is the equity token for impact-driven users of the HeavenOS ecosystem.
        It’s earned through Karma, Vision completion, and positive social validation.
      </Text>

      <Text className="text-purple-300 text-xl font-semibold mb-2">🏆 Earn HeavenCoin</Text>
      <Text className="text-white">• +10 per Vision Posted</Text>
      <Text className="text-white">• +25 per Vision Completed</Text>
      <Text className="text-white">• +5 per Upvote on Vision</Text>

      <Text className="text-purple-300 text-xl font-semibold mt-6 mb-2">📜 Protocol Rules</Text>
      <Text className="text-white">• Karma = Trust Weight</Text>
      <Text className="text-white">• HeavenCoin is non-transferable until governance unlocks</Text>
      <Text className="text-white">• Value is derived from collective global participation</Text>

      <Text className="text-purple-300 text-xl font-semibold mt-6 mb-2">🔒 Coming Soon</Text>
      <Text className="text-white">• Smart Contract Ledger</Text>
      <Text className="text-white">• HeavenSwap DEX</Text>
      <Text className="text-white">• Vision NFTs</Text>
    </ScrollView>
  );
}
