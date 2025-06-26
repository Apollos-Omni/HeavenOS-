import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from '../UI/ProgressBar';

type TrustProfile = {
  karmaTrustScore: number;
  trustTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  suggestedAction?: string;
};

interface Props {
  trustProfile: TrustProfile;
}

export default function KarmaTrustCard({ trustProfile }: Props) {
  const { karmaTrustScore = 0, trustTier = 'Bronze', suggestedAction } = trustProfile;

  return (
    <View className="bg-gray-900 p-4 rounded-lg border border-purple-700">
      <Text className="text-white text-lg font-bold">
        Karma Trust Score: {karmaTrustScore}
      </Text>
      <Text className="text-purple-400">Tier: {trustTier}</Text>
      {suggestedAction && (
        <Text className="text-yellow-400 mt-2 italic">{suggestedAction}</Text>
      )}
      <ProgressBar progress={karmaTrustScore / 100} color="#a855f7" />
    </View>
  );
}
