import React, { useState } from 'react';
import { View, TextInput, Switch, Button } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import * as Location from 'expo-location';
import { db } from '../../firebase/config';
import { useAuth } from '../hooks/useAuth';

export default function DropMessageForm() {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [karmaRequired, setKarmaRequired] = useState(0);

  const dropMessage = async () => {
    const loc = await Location.getCurrentPositionAsync({});
    await addDoc(collection(db, 'drops'), {
      userId: user.uid,
      text,
      isAnonymous: anonymous,
      karmaRequired,
      location: {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      },
      geohash: 'TODO', // optional: use geohash library
      timestamp: new Date()
    });
    setText('');
  };

  return (
    <View className="p-4 bg-black">
      <TextInput
        placeholder="Write your unsent message..."
        value={text}
        onChangeText={setText}
        className="bg-gray-800 text-white p-2 rounded"
      />
      <Switch value={anonymous} onValueChange={setAnonymous} />
      <TextInput
        placeholder="Minimum karma to unlock?"
        keyboardType="numeric"
        value={karmaRequired.toString()}
        onChangeText={val => setKarmaRequired(Number(val))}
        className="bg-gray-700 text-white mt-2 p-2 rounded"
      />
      <Button title="Drop Message" onPress={dropMessage} />
    </View>
  );
}
