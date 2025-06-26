import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import axios from 'axios';

export default function VisionCoach() {
  const [vision, setVision] = useState('');
  const [response, setResponse] = useState('');

  const handleCoach = async () => {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert visionary coach helping people improve their ideas.' },
        { role: 'user', content: `My vision is: ${vision}` }
      ]
    }, {
      headers: {
        Authorization: `Bearer YOUR_OPENAI_API_KEY`
      }
    });

    setResponse(res.data.choices[0].message.content);
  };

  return (
    <ScrollView className="bg-black p-4">
      <TextInput
        placeholder="Enter your vision here..."
        placeholderTextColor="#aaa"
        onChangeText={setVision}
        value={vision}
        className="bg-gray-900 text-white p-4 rounded mb-2"
      />
      <Button title="Coach Me" onPress={handleCoach} />
      <Text className="text-green-300 mt-4">{response}</Text>
    </ScrollView>
  );
}
