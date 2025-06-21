import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import RegisterScreen from './screens/RegisterScreen';
import VisionBoard from './screens/VisionBoard';
import GlobalFeed from './screens/GlobalFeed';
import useAuthStore from './store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const user = useAuthStore(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="GlobalFeed" component={GlobalFeed} />
            <Stack.Screen name="VisionBoard" component={VisionBoard} />
          </>
        ) : (
          <>
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}