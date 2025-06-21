import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Vault() {
  const [vault, setVault] = useState<any>(null);

  useEffect(() => {
    const fetchVault = async () => {
      const snap = await getDoc(doc(db, 'vaults', 'globalVault'));
      if (snap.exists()) setVault(snap.data());
    };
    fetchVault();
  }, []);

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-white text-3xl font-bold mb-4">🔐 Global Vault</Text>
      <Text className="text-purple-400 text-2xl mb-2">Balance: {vault?.balance} HVC</Text>
      <Text className="text-white text-lg mb-4">Top Stakeholders:</Text>
      {vault?.stakeholders &&
        Object.entries(vault.stakeholders).map(([uid, amt]) => (
          <Text key={uid} className="text-gray-300">👤 {uid.slice(0, 6)}... — {amt} HVC</Text>
        ))}
    </ScrollView>
  );
}
