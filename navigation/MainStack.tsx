import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { GlobalFeed } from '../screens/GlobalFeed';
import { VisionBoard } from '../screens/VisionBoard';
import { ActivitiesBoard } from '../screens/ActivitiesBoard';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="GlobalFeed" component={GlobalFeed} />
      <Stack.Screen name="VisionBoard" component={VisionBoard} />
      <Stack.Screen name="ActivitiesBoard" component={ActivitiesBoard} />
    </Stack.Navigator>
  );
}