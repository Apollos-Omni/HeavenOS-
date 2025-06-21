import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../hooks/useAuth';

export default function KarmaVotePanel({ voteId }) {
  const { user } = useAuth();
  const [voteData, setVoteData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchVote = async () => {
      const snap = await getDoc(doc(db, 'votes', voteId));
      if (snap.exists()) setVoteData(snap.data());
    };
    fetchVote();
  }, []);

  const submitVote = async () => {
    const weight = computeVoteWeight(user.karma, user.accountAgeDays);
    const ref = doc(db, 'votes', voteId);

    await updateDoc(ref, {
      [`votes.${user.uid}`]: { choice: selected, weight },
      [`totalVotes.${selected}`]: voteData.totalVotes[selected] + weight
    });
  };

  if (!voteData) return <Text className="text-white">Loading...</Text>;

  return (
    <View className="bg-black p-4">
      <Text className="text-purple-300 text-lg font-bold">{voteData.title}</Text>
      <Text className="text-white mb-4">{voteData.description}</Text>

      {voteData.choices.map(choice => (
        <Button key={choice} title={choice} onPress={() => setSelected(choice)} />
      ))}

      <Button title="Submit Vote" onPress={submitVote} disabled={!selected} />
    </View>
  );
}
