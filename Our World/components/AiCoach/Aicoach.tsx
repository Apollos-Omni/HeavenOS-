import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function AiCoach({ userId }) {
  const [coachData, setCoachData] = useState({ skills: {}, recommendedNext: [] });

  useEffect(() => {
    const fetchCoach = async () => {
      const ref = doc(db, 'skillCoach', userId);
      const snap = await getDoc(ref);
      setCoachData(snap.exists() ? snap.data() : {});
    };
    fetchCoach();
  }, []);

  return (
    <View className="bg-black p-4">
      <Text className="text-xl text-yellow-300 font-bold mb-2">🧠 Skill AI Coach</Text>
      <Text className="text-white">Top Recommendations:</Text>
      <ScrollView>
        {coachData.recommendedNext?.map((skill, i) => (
          <Text key={i} className="text-green-400">👉 {skill}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
