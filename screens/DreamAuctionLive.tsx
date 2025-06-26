import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function DreamAuctionLive({ route }: any) {
  const { dreamId } = route.params;
  const [auction, setAuction] = useState<any>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      const ref = doc(db, 'dreamAuctions', dreamId);
      const snap = await getDoc(ref);
      setAuction(snap.data());
    };
    fetchAuction();
  }, []);

  return (
    <ScrollView className="bg-black p-6">
      {auction && (
        <>
          <Text className="text-purple-400 text-2xl mb-2">{auction.title}</Text>
          <Text className="text-white mb-4">{auction.description}</Text>

          <Text className="text-yellow-300">🌍 Region: {auction.region}</Text>
          <Text className="text-white">Goal: ${auction.fundingGoal}</Text>
          <Text className="text-white">Funded: ${auction.currentFunding}</Text>
          <Text className="text-white">Karma Bounty: {auction.karmaBounty}</Text>
          <Text className="text-white">Needed Skills: {auction.laborNeeded.join(', ')}</Text>

          <View style={{ marginTop: 20 }}>
            <Button
              title="Contribute Funds"
              color="#22c55e"
              onPress={() => alert('Coming soon')}
            />
            <Button
              title="Offer Skills"
              color="#0ea5e9"
              onPress={() => alert('Skill contribution incoming')}
            />
            <Button
              title="Mentor this Dream"
              color="#9333ea"
              onPress={() => alert('Mentorship request sent')}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}
