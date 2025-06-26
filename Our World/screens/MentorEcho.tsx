import React, { useState } from 'react';
import { View, TextInput, Text, Button, ScrollView } from 'react-native';
import useAuthStore from '../store/useAuthStore';
import { generateImmortalPersona, respondAsImmortalMentor } from '../mentor/immortalTrainer';

export default function MentorEcho() {
  const user = useAuthStore(state => state.user);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const askMentor = async () => {
    const persona = await generateImmortalPersona(user.uid);
    const answer = await respondAsImmortalMentor(question, persona);
    setResponse(answer);
  };

  return (
    <ScrollView className="bg-black p-6">
      <Text className="text-purple-400 text-3xl mb-4">🧠 Immortal Mentor</Text>
      <TextInput
        placeholder="Ask your immortal self..."
        value={question}
        onChangeText={setQuestion}
        className="bg-white text-black p-2 mb-4 rounded"
      />
      <Button title="Ask" onPress={askMentor} color="#9333ea" />
      {response && <Text className="text-white mt-4">{response}</Text>}
    </ScrollView>
  );
}
