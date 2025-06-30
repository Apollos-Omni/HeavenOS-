import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TestApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 App is Working!</Text>
      <Text style={styles.subtitle}>React Native Web Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#e5e7eb",
  },
});
