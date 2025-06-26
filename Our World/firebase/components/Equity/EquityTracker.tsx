import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { db } from '../firebase/config';
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ProgressCircle } from 'react-native-svg-charts';

export default function DreamAuctionWithEquityTracker({ userId, dream }) {
  const [equity, setEquity] = useState({ totalHours: 0, totalEquityValue: 0 });
  const [bids, setBids] = useState([]);
  const [newSponsor, setNewSponsor] = useState('');
  const [newType, setNewType] = useState('');
  const [newValue, setNewValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Real-time equity listener
  useEffect(() => {
    const ref = doc(db, 'equityLedgers', userId);
    const unsub = onSnapshot(ref, docSnap => {
      setEquity(docSnap.exists() ? docSnap.data() : { totalHours: 0, totalEquityValue: 0 });
    });
    return () => unsub();
  }, [userId]);

  // Real-time bids listener
  useEffect(() => {
    const bidsRef = collection(db, 'dreamAuctions', 'currentDream', 'bids');
    const q = query(bidsRef, orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, querySnapshot => {
      const loadedBids = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBids(loadedBids);
    });
    return () => unsub();
  }, []);

  const ownershipProgress = Math.min(equity.totalEquityValue / 10000, 1);

  const handleAddBid = async () => {
    if (!newSponsor || !newType || !newValue) {
      Alert.alert('Please fill in all bid fields.');
      return;
    }

    setSubmitting(true);
    try {
      const bidsRef = collection(db, 'dreamAuctions', 'currentDream', 'bids');
      await addDoc(bidsRef, {
        sponsor: newSponsor,
        type: newType,
        value: newValue,
        timestamp: serverTimestamp(),
        userId,
      });

      setNewSponsor('');
      setNewType('');
      setNewValue('');
      Alert.alert('Bid submitted successfully!');
    } catch (error: any) {
      Alert.alert('Error submitting bid', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'black' }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Dream Description */}
        <Text className="text-white text-2xl font-bold mb-4">🌟 Dream Auction</Text>
        <Text className="text-purple-300 mb-6">{dream}</Text>

        {/* Bids List */}
        <Text className="text-white text-xl mb-2 font-semibold">Current Bids:</Text>
        <FlatList
          data={bids}
          keyExtractor={item => item.id}
          style={{ maxHeight: 300 }}
          renderItem={({ item }) => (
            <View className="bg-gray-800 p-3 rounded mb-2">
              <Text className="text-white font-bold">{item.sponsor}</Text>
              <Text className="text-gray-300">Type: {item.type}</Text>
              <Text className="text-green-400">Value: {item.value}</Text>
            </View>
          )}
        />

        {/* New Bid Form */}
        <View className="mt-6 bg-gray-900 p-4 rounded">
          <Text className="text-white text-lg mb-2 font-semibold">Place a New Bid</Text>
          <TextInput
            placeholder="Sponsor"
            value={newSponsor}
            onChangeText={setNewSponsor}
            className="bg-white mb-2 p-2 rounded"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Type (e.g. tech, funds)"
            value={newType}
            onChangeText={setNewType}
            className="bg-white mb-2 p-2 rounded"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Value"
            value={newValue}
            onChangeText={setNewValue}
            className="bg-white mb-4 p-2 rounded"
            placeholderTextColor="#999"
          />
          <Button
            title={submitting ? 'Submitting...' : 'Submit Bid'}
            onPress={handleAddBid}
            disabled={submitting}
            color="#a855f7"
          />
        </View>

        {/* Equity Tracker */}
        <View className="mt-8 items-center">
          <Text className="text-white text-xl mb-2 font-bold">📈 Equity Tracker</Text>
          <ProgressCircle
            style={{ height: 200, width: 200 }}
            progress={ownershipProgress}
            progressColor="#FFD700"
            backgroundColor="#333"
          />
          <Text className="text-white mt-4">Total Hours: {equity.totalHours}</Text>
          <Text className="text-green-400">
            Equity Value: ${equity.totalEquityValue.toFixed(2)}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
