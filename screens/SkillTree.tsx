import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function SkillTree() {
  const user = useAuthStore(state => state.user);
  const [skills, setSkills] = useState<any>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const snap = await getDoc(doc(db, 'skills', user.uid));
      setSkills(snap.data()?.skills || {});
    };
    fetchSkills();
  }, []);

  if (!skills) return <Text className="text-white">Loading skill tree...</Text>;

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-white text-3xl font-bold mb-4">🧬 Skill Tree</Text>
      {Object.entries(skills).map(([skill, data]: any) => (
        <View key={skill} className="bg-gray-900 p-4 mb-4 rounded">
          <Text className="text-purple-400 text-lg">{skill.toUpperCase()}</Text>
          <Text className="text-white">Level: {data.level} | XP: {data.xp}/{data.nextMilestone}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
