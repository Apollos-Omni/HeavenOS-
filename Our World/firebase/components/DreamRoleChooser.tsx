import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

const dreamRoles = [
  { id: 'lightArchitect', name: '💡 Light Architect', desc: 'Bringer of illumination to dark places' },
  { id: 'peaceKnight', name: '🛡️ Peace Knight', desc: 'Protector of harmony in conflict zones' },
  { id: 'dreamEngineer', name: '⚙️ Dream Engineer', desc: 'Builder of hope and structures alike' },
  { id: 'healerOfStreets', name: '🩹 Healer of Streets', desc: 'Restores what society abandoned' },
];

export default function DreamRoleChooser() {
  const [selectedRole, setSelectedRole] = useState(null);
  const user = useAuthStore(state => state.user);

  const assignRole = async () => {
    if (!selectedRole) return Alert.alert('Choose a Role');
    const userRef = doc(db, 'userRoles', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      dreamRole: selectedRole.name,
      currentTier: 'Novice',
      xp: 0,
      karma: 0,
      completedTasks: 0,
      region: user.region,
    });
    Alert.alert('Role Assigned', `Welcome, ${selectedRole.name}!`);
  };

  return (
    <View className="bg-black p-5">
      <Text className="text-white text-2xl mb-4">🎭 Choose Your Dream Role</Text>
      <FlatList
        data={dreamRoles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-3">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-sm italic">{item.desc}</Text>
            <Button
              title="Select"
              onPress={() => setSelectedRole(item)}
              color={selectedRole?.id === item.id ? "#22c55e" : "#8b5cf6"}
            />
          </View>
        )}
      />
      {selectedRole && <Button title="Confirm Role" onPress={assignRole} color="#16a34a" />}
    </View>
  );
}
