import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useAuthStore from '../store/useAuthStore';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      login(userCredential.user);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black px-4">
      <Text className="text-white text-2xl mb-4">Login to Our World</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}
        className="bg-white w-full mb-2 p-2 rounded" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword}
        className="bg-white w-full mb-4 p-2 rounded" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}