import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useAuthStore from '../store/useAuthStore';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useAuthStore(state => state.login);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      register(userCredential.user);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black px-4">
      <Text className="text-white text-2xl mb-4">Register for Our World</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}
        className="bg-white w-full mb-2 p-2 rounded" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword}
        className="bg-white w-full mb-4 p-2 rounded" secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}