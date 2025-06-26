// screens/RaffleDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { joinRaffle } from '../firebase/functions/raffle/joinRaffle';
import { useAuth } from '../auth/useAuth';

export default function RaffleDashboard() {
  const [raffles, setRaffles] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'raffles'), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRaffles(data);
    });
    return () => unsub();
  }, []);

  const handleJoin = async (raffleId: string) => {
    if (!user) return;
    await joinRaffle(raffleId, user.uid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Raffle Dashboard</Text>
      <FlatList
        data={raffles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const joined = item.tickets?.some((t: any) => t.userId === user?.uid);
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>Status: {item.status}</Text>
              {item.status === 'closed' && item.winner && (
                <Text>🏆 Winner: {item.winner.userId}</Text>
              )}
              {item.status === 'open' && !joined && (
                <Button title="Join Raffle" onPress={() => handleJoin(item.id)} />
              )}
              {joined && item.status === 'open' && (
                <Text style={styles.joined}>✅ You’ve joined</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  joined: { marginTop: 5, color: 'green' },
});
