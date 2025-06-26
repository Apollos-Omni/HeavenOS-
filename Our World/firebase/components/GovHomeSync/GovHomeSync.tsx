import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function GovHomeSync() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      const snap = await getDocs(collection(db, 'govHomes'));
      setHomes(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchHomes();
  }, []);

  return (
    <ScrollView className="bg-gray-950 p-4">
      <Text className="text-white text-2xl font-bold mb-3">🏛️ Government Housing Sync</Text>
      {homes.map(home => (
        <View key={home.id} className="bg-gray-800 rounded-xl p-4 mb-3">
          <Text className="text-white">{home.address}</Text>
          <Text className="text-red-400">Status: {home.status}</Text>
          <Text className="text-green-300">Value: ${home.assessedValue}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
