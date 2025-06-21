import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function SponsorPortal() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const snap = await getDocs(collection(db, 'sponsors'));
      setSponsors(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSponsors();
  }, []);

  return (
    <ScrollView className="bg-black p-4">
      <Text className="text-yellow-300 text-2xl font-bold mb-3">🤝 Sponsor Portal</Text>
      {sponsors.map(s => (
        <View key={s.id} className="bg-gray-800 rounded-2xl p-4 mb-4">
          <Text className="text-white text-lg">{s.name}</Text>
          <Text className="text-green-400">Type: {s.type}</Text>
          <Text className="text-purple-400">Contributions: {s.contributionType.join(', ')}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
