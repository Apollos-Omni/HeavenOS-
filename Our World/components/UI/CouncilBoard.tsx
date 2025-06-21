import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function CouncilBoard() {
  const [councils, setCouncils] = useState([]);

  useEffect(() => {
    const fetchCouncils = async () => {
      const snapshot = await getDocs(collection(db, 'councils'));
      setCouncils(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCouncils();
  }, []);

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-yellow-400 text-2xl font-bold mb-2">👑 Council Governance</Text>
      {councils.map(c => (
        <View key={c.id} className="bg-gray-900 p-3 rounded-2xl mb-4">
          <Text className="text-white text-lg">📂 {c.category.toUpperCase()}</Text>
          <Text className="text-green-300">Leader: {c.currentLeaderId}</Text>
          <Text className="text-purple-300">Followers: {c.followers}</Text>
          <Button title="Vote Now" onPress={() => alert("Voting screen coming soon...")} />
        </View>
      ))}
    </ScrollView>
  );
}
