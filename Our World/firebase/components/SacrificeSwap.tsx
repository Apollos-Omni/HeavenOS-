import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function SacrificeSwap() {
  const user = useAuthStore(state => state.user);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, 'sacrificeSwaps'));
      const unresolved = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(r => !r.taskCompleted && r.approved && r.sacrificerId === null);
      setRequests(unresolved);
    };
    fetchRequests();
  }, []);

  const acceptSwap = async (id) => {
    await updateDoc(doc(db, 'sacrificeSwaps', id), {
      sacrificerId: user.uid
    });
    Alert.alert('Blessing Received', 'You’ve chosen to bear this karma debt.');
  };

  return (
    <View className="bg-black p-6">
      <Text className="text-white text-2xl mb-4">🤝 Sacrifice Swap</Text>

      {requests.map((r) => (
        <View key={r.id} className="bg-white p-3 rounded mb-3">
          <Text>Recipient: {r.recipientId}</Text>
          <Text>Karma Debt: {r.karmaDebt}</Text>
          <Button title="Accept Karma" onPress={() => acceptSwap(r.id)} />
        </View>
      ))}
    </View>
  );
}
