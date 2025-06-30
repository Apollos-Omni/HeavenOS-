import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function FreshApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Demo Login", `Email: ${email}\nThis is working!`);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#ffffff",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        ✨ Our World App ✨
      </Text>

      <TextInput
        style={{
          backgroundColor: "#ffffff",
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
          fontSize: 16,
        }}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          backgroundColor: "#ffffff",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 16,
        }}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4f46e5",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleLogin}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Login to Our World
        </Text>
      </TouchableOpacity>
    </View>
  );
}
