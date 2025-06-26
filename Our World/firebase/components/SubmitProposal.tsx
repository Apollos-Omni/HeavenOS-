import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

export default function SubmitProposal() {
  const user = useAuthStore(state => state.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const submit = async () => {
    if (!title || !description) return Alert.alert("Incomplete", "Title and description required.");
    await addDoc(collection(db, 'proposals'), {
      title,
      description,
      authorId: user.uid,
      region: user.region,
      category,
      submittedAt: serverTimestamp(),
      votesFor: 0,
      votesAgainst: 0,
      status: "pending",
      impactTier: 1
    });
    Alert.alert("Submitted", "Proposal submitted for DAO review.");
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">📜 Submit a New Proposal</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} className="bg-white p-2 rounded mb-2" />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} multiline numberOfLines={5} className="bg-white p-2 rounded mb-2" />
      <TextInput placeholder="Category (e.g. Housing, Food, Safety)" value={category} onChangeText={setCategory} className="bg-white p-2 rounded mb-4" />
      <Button title="Submit Proposal" onPress={submit} color="#22c55e" />
    </View>
  );
}
