import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import IsolatedAuth from "./IsolatedAuth";

export default function App() {
  return (
    <SafeAreaProvider>
      <IsolatedAuth />
    </SafeAreaProvider>
  );
}
