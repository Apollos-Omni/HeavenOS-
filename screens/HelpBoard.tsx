import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function HelpBoard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchHelp = async () => {
      const snap = await getDocs(collection(db, 'completedQuests'));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(list);
    };
    fetchHelp();
  }, []);

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🌍 Public HelpBoard</Text>
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded mb-3">
            <Text className="font-bold text-indigo-600">Quest: {item.questId}</Text>
            <Text>User: {item.userId}</Text>
            <Text>Karma: {item.karmaAwarded} | XP: {item.xpAwarded}</Text>
            {item.proofURL && (
              <Image source={{ uri: item.proofURL }} style={{ width: '100%', height: 180, borderRadius: 10 }} />
            )}
          </View>
        )}
      />
    </View>
  );
}
