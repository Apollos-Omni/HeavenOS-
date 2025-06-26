import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function CivilizationSyncHub() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchSyncData = async () => {
      const syncRef = doc(db, 'civilizationSyncHub', 'core');
      const snap = await getDoc(syncRef);
      setData(snap.data());
    };
    fetchSyncData();
  }, []);

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-3xl text-purple-400 mb-4">🌍 Civilization Sync Hub</Text>

      {data && (
        <>
          <Text className="text-white text-lg mb-2">👤 Total Users: {data.totalUsers}</Text>
          <Text className="text-white text-lg mb-2">💡 Synced Visions: {data.syncedVisions}</Text>
          <Text className="text-white text-lg mb-2">🧠 Mentor Threads: {data.mentorThreads}</Text>
          <Text className="text-white text-lg mb-2">🪙 Total Karma: {data.karmaDelta.total}</Text>
          <Text className="text-white text-lg mb-2">🔁 Dream Auctions Live: {data.dreamAuctionActive}</Text>
          <Text className="text-white text-lg mb-4">📜 HeavenChain Blocks: {data.heavenChainBlocks}</Text>

          <Text className="text-white text-xl mt-6 mb-2">📣 Global Alerts</Text>
          {data.globalAlerts.map((alert: string, idx: number) => (
            <Text key={idx} className="text-white mb-1">• {alert}</Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}
