import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ConstitutionViewer() {
  const [constitution, setConstitution] = useState(null);

  useEffect(() => {
    const fetchConstitution = async () => {
      const snap = await getDoc(doc(db, 'constitution', 'core'));
      if (snap.exists()) setConstitution(snap.data());
    };
    fetchConstitution();
  }, []);

  if (!constitution) return <Text className="text-white">Loading...</Text>;

  return (
    <ScrollView className="p-4 bg-black">
      <Text className="text-purple-300 text-xl font-bold mb-4">🛡 Our World Constitution</Text>
      <Text className="text-white italic mb-6">{constitution.preamble}</Text>

      {constitution.articles.map((a, i) => (
        <View key={i} className="mb-4">
          <Text className="text-purple-200 font-semibold">{a.title}</Text>
          <Text className="text-white">{a.body}</Text>
        </View>
      ))}

      <Text className="text-yellow-400 text-lg mt-6 mb-2">📜 Proposed Amendments</Text>
      {constitution.amendments.map((am, i) => (
        <View key={i} className="bg-gray-900 p-3 rounded mb-2">
          <Text className="text-white font-bold">{am.title}</Text>
          <Text className="text-gray-400">Status: {am.status}</Text>
          <Text className="text-green-400">Votes For: {am.votesFor}</Text>
          <Text className="text-red-400">Votes Against: {am.votesAgainst}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
