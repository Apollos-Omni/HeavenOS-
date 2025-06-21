import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function KarmaTrail() {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const loadTrail = async () => {
      const snap = await getDocs(collection(db, 'karmaTrail/Galveston/entries'));
      const trailData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrail(trailData);
    };
    loadTrail();
  }, []);

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🌀 Karma Trail</Text>
      <FlatList
        data={trail}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-3">
            <Text className="font-bold text-indigo-700">Quest: {item.questId}</Text>
            <Text>Impact: {item.effect}</Text>
            <Text>Karma Shift: {item.karmaImpact} ⚛️</Text>
            <Text className="italic">Inspired: {item.inspiredUsers?.length || 0} users</Text>
          </View>
        )}
      />
    </View>
  );
}
