import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function Wallet() {
  const user = useAuthStore(state => state.user);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      const snap = await getDoc(doc(db, 'users', user.uid, 'wallet'));
      if (snap.exists()) setWallet(snap.data());
    };
    fetchWallet();
  }, []);

  if (!wallet) return <Text className="text-white">Loading...</Text>;

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-white text-3xl font-bold mb-4">💰 HeavenCoin Wallet</Text>
      <Text className="text-purple-400 text-xl mb-2">Balance: {wallet.balance} HVC</Text>
      <Text className="text-green-400 mb-4">Karma: {wallet.karma} | Influence: {wallet.influence}</Text>

      <Text className="text-white text-lg mb-2">Transactions:</Text>
      {wallet.transactions?.map((txn, i) => (
        <View key={i} className="bg-gray-800 p-2 mb-2 rounded">
          <Text className="text-white">{txn.type === 'earn' ? '🟢 Earned' : '🔴 Spent'}: {txn.amount} HVC</Text>
          <Text className="text-gray-300 text-sm">{txn.timestamp}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
