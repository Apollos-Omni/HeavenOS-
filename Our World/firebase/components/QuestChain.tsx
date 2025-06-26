import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { getMentorGuidance } from '../utils/mentorAi';

export default function QuestChain({ route }) {
  const { chainId, userRole, currentQuestIndex } = route.params;
  const [chainData, setChainData] = useState(null);

  useEffect(() => {
    const loadChain = async () => {
      const snap = await getDoc(doc(db, 'questChains', chainId));
      setChainData(snap.data());
    };
    loadChain();
  }, [chainId]);

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🔗 Quest Chain</Text>
      {chainData && (
        <>
          <Text className="text-indigo-400 text-lg mb-2">{chainData.title}</Text>
          <Text className="text-white italic mb-3">{chainData.description}</Text>

          {/* Mentor guidance displayed here */}
          <Text className="text-white italic mt-4">
            🧠 Mentor Says: {getMentorGuidance(userRole, currentQuestIndex)}
          </Text>

          <FlatList
            data={chainData.quests}
            keyExtractor={(qId) => qId}
            renderItem={({ item }) => (
              <View className="bg-white p-3 rounded mb-3">
                <Text className="text-indigo-700 font-bold">Quest ID: {item}</Text>
                <Button title="Open Quest" onPress={() => {/* navigate */}} />
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}
