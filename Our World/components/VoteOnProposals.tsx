import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';

export default function VoteOnProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const snap = await getDocs(collection(db, 'proposals'));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProposals(list.filter(p => p.status === 'pending'));
    };
    fetchProposals();
  }, []);

  const vote = async (id: string, field: 'votesFor' | 'votesAgainst') => {
    await updateDoc(doc(db, 'proposals', id), {
      [field]: increment(1)
    });
  };

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🏛 Public Proposal Voting</Text>
      <FlatList
        data={proposals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-4">
            <Text className="font-bold text-indigo-700">{item.title}</Text>
            <Text className="italic mb-2">{item.description}</Text>
            <Text>Votes: ✅ {item.votesFor} | ❌ {item.votesAgainst}</Text>
            <View className="flex-row mt-2 space-x-2">
              <Button title="✅ Yes" onPress={() => vote(item.id, 'votesFor')} />
              <Button title="❌ No" onPress={() => vote(item.id, 'votesAgainst')} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
