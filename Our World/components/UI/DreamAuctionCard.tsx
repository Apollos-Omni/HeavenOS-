import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../hooks/useAuth';

export default function DreamAuctionCard({ auction }) {
  const { user } = useAuth();
  const [bid, setBid] = useState('');

  const submitBid = async () => {
    const auctionRef = doc(db, 'auctions', auction.id);
    await updateDoc(auctionRef, {
      currentHighestBid: { amount: Number(bid), bidderId: user.uid },
      bidHistory: arrayUnion({ amount: Number(bid), bidderId: user.uid, timestamp: new Date() })
    });
    setBid('');
  };

  return (
    <View className="p-4 bg-gray-900 mb-4 rounded-xl">
      <Text className="text-white font-bold text-lg">🔥 {auction.auctionType.toUpperCase()} AUCTION</Text>
      <Text className="text-purple-300 mt-1">Vision ID: {auction.visionId}</Text>
      <Text className="text-white mt-2">Current Highest Bid: ${auction.currentHighestBid?.amount || 0}</Text>

      <TextInput
        placeholder="Your Bid Amount"
        value={bid}
        onChangeText={setBid}
        keyboardType="numeric"
        className="bg-black text-white p-2 rounded my-2"
      />
      <Button title="Submit Bid" onPress={submitBid} />
    </View>
  );
}
