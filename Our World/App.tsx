import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import DrawerNavigator from "./navigation/DrawerNavigator";
import AuthScreen from "./screens/AuthScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DropScreen from "./screens/DropScreen";
import HeavenWallet from "./screens/HeavenWallet"; // ✅ HeavenWallet imported
import HeavenLanding from "./screens/HeavenLanding";
import HeavenCoin from "./screens/HeavenCoin";

import useAuthStore from "./store/AuthStore";

const Stack = createNativeStackNavigator();

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              {/* ✅ Main App Screens for Logged-In Users */}
              <Stack.Screen name="Home" component={DrawerNavigator} />

              <Stack.Screen name="DropScreen">
                {() => (
                  <DropScreen
                    drop={{
                      title: "Karma Secrets",
                      unlockedBy: ["user_123"],
                      karmaRequired: 50,
                    }}
                    user={{
                      uid: user.uid,
                      karma: user.karma || 0,
                    }}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="HeavenWallet" component={HeavenWallet} />
              <Stack.Screen name="HeavenLanding" component={HeavenLanding} />
              <Stack.Screen name="HeavenCoin" component={HeavenCoin} />
            </>
          ) : (
            <>
              {/* 🚪 Authentication Screens */}
              <Stack.Screen name="AuthScreen" component={AuthScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
