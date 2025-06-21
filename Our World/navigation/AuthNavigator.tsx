import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DropScreen from '../screens/DropScreen';
import DrawerNavigator from './DrawerNavigator';
import LoadingScreen from '../screens/LoadingScreen'; // Optional
import MirrorBoardScreen from '../screens/MirrorBoardScreen';
import DreamAuctionScreen from '../screens/DreamAuctionScreen';
import CoachScreen from '../screens/CoachScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user === undefined ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : user ? (
        <>
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="DropScreen" component={DropScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MirrorBoard" component={MirrorBoardScreen} />
          <Stack.Screen name="DreamAuctions" component={DreamAuctionScreen} />
          <Stack.Screen name="Coach" component={CoachScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
