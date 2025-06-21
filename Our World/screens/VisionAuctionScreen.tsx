// screens/VisionAuctionScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import useAuthStore from '../store/useAuthStore';

export default function VisionAuctionScreen() {
  const [visions, setVisions] = useState([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchVisions = async () => {
      const snapshot = await getDocs(collection(db, 'visions'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVisions(data);
    };

    fetchVisions();
  }, []);

  const handleBid = async (visionId: string) => {
    try {
      const ref = doc(db, 'visions', visionId);
      await updateDoc(ref, {
        topBidder: user.uid,
        status: 'pending_sponsorship'
      });
      Alert.alert('Success', 'You are now sponsoring this vision.');
    } catch (err) {
      Alert.alert('Error', err.message || 'Bidding failed');
    }
  };

  return (
    <FlatList
      style={{ backgroundColor: '#000' }}
      data={visions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, margin: 8, backgroundColor: '#111', borderRadius: 10 }}>
          <Text style={{ color: '#a855f7', fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
          <Text style={{ color: '#ccc', marginVertical: 6 }}>{item.description}</Text>
          <Button title="Sponsor Vision" color="#9333ea" onPress={() => handleBid(item.id)} />
        </View>
      )}
    />
  );
}
