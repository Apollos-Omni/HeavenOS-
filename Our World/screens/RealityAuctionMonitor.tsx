import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function RealityAuctionMonitor() {
  const [chains, setChains] = useState<any[]>([]);

  useEffect(() => {
    const fetchChains = async () => {
      const ref = collection(db, 'dreamChains');
      const snapshot = await getDocs(ref);
      const readyChains = snapshot.docs.map(doc => doc.data()).filter(chain => chain.executionMode === 'realityAuctionReady');
      setChains(readyChains);
    };
    fetchChains();
  }, []);

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-2xl text-lime-400 mb-4">🔗 Reality Auctions</Text>

      {chains.map((chain, i) => (
        <View key={i} className="bg-gray-900 p-4 rounded mb-4">
          <Text className="text-white text-xl">{chain.chainName}</Text>
          <Text className="text-gray-300">Dreams: {chain.linkedDreams.length}</Text>
          <Text className="text-gray-300">Karma Value: {chain.karmaValue}</Text>
          <Text className="text-gray-300">Funding: ${chain.fundingTotal}</Text>
          <Text className="text-gray-300">Mentors: {chain.mentors.join(', ')}</Text>
          <Text className="text-emerald-400 mt-2">Status: {chain.executionMode}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
