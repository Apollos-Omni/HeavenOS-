// screens/CreateRaffle.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../auth/useAuth';

export default function CreateRaffle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketLimit, setTicketLimit] = useState('');
  const [deadline, setDeadline] = useState('');
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!title || !description || !ticketLimit || !deadline) {
      Alert.alert('Missing Fields', 'Please complete all fields.');
      return;
    }

    try {
      const deadlineDate = new Date(deadline);
      await addDoc(collection(db, 'raffles'), {
        title,
        description,
        ticketLimit: parseInt(ticketLimit),
        deadline: Timestamp.fromDate(deadlineDate),
        status: 'open',
        creatorId: user?.uid,
        tickets: [],
        createdAt: Timestamp.now(),
      });
      Alert.alert('✅ Success', 'Raffle created!');
      setTitle('');
      setDescription('');
      setTicketLimit('');
      setDeadline('');
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎯 Create a New Raffle</Text>
      <TextInput
        style={styles.input}
        placeholder="Raffle Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Ticket Limit"
        keyboardType="number-pad"
        value={ticketLimit}
        onChangeText={setTicketLimit}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline (YYYY-MM-DD)"
        value={deadline}
        onChangeText={setDeadline}
      />
      <Button title="Create Raffle" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5,
  },
});
