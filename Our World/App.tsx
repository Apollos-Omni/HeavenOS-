import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthScreen from "./screens/AuthScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthScreen />
    </SafeAreaProvider>
  );
}
