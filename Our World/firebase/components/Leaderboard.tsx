// components/Leaderboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(collection(db, 'users'), orderBy('karma', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      setTopUsers(snapshot.docs.map(doc => doc.data()));
    };

    fetchLeaderboard();
  }, []);

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-white text-3xl mb-4">Top Karma Leaders</Text>
      {topUsers.map((user, index) => (
        <View key={index} className="mb-2 bg-gray-800 p-3 rounded">
          <Text className="text-white text-xl">{user.email}</Text>
          <Text className="text-purple-400">Karma: {user.karma}</Text>
          <Text className="text-purple-300">Influence: {user.influence}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
