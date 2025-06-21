// screens/DrawWinnerScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { collection, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../auth/useAuth';

export default function DrawWinnerScreen() {
  const [raffles, setRaffles] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'raffles'), (snap) => {
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((r) => r.status === 'open' && r.creatorId === user?.uid);
      setRaffles(data);
    });
    return () => unsub();
  }, []);

  const drawWinner = async (raffleId: string) => {
    try {
      const raffleRef = doc(db, 'raffles', raffleId);
      const raffleSnap = await getDoc(raffleRef);

      if (!raffleSnap.exists()) return Alert.alert('Error', 'Raffle not found');

      const raffle = raffleSnap.data();
      const tickets = raffle?.tickets || [];
      if (tickets.length === 0) return Alert.alert('No Entries', 'No one joined this raffle.');

      const randomIndex = Math.floor(Math.random() * tickets.length);
      const winner = tickets[randomIndex];

      await updateDoc(raffleRef, {
        status: 'closed',
        winner,
        closedAt: new Date().toISOString(),
      });

      Alert.alert('🎉 Winner Selected', `Ticket #${winner.ticketNumber} | ${winner.userId}`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Close Raffle & Draw Winner</Text>
      <FlatList
        data={raffles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.header}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Button title="Draw Winner" onPress={() => drawWinner(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  header: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
});
