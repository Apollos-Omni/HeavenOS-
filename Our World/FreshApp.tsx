import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function FreshApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    if (email && password) {
      // Simulate successful login
      setUser({ email, name: email.split("@")[0], karma: 150 });
      setIsLoggedIn(true);
    } else {
      Alert.alert("Error", "Please enter both email and password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setEmail("");
    setPassword("");
  };

  // Show main dashboard if logged in
  if (isLoggedIn && user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f0f23",
        }}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: "#1a1a3a",
            paddingTop: 50,
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: 5,
            }}
          >
            Welcome to Our World
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#a0a0ff",
            }}
          >
            {user.name} • Karma: {user.karma}
          </Text>
        </View>

        <ScrollView style={{ flex: 1, padding: 20 }}>
          {/* Dashboard Cards */}
          <View style={{ gap: 15 }}>
            <DashboardCard
              title="🌟 Vision Board"
              description="Share your dreams and aspirations with the community"
              color="#4f46e5"
            />
            <DashboardCard
              title="🧘 Mental Wellness"
              description="Track your mental health journey and find support"
              color="#059669"
            />
            <DashboardCard
              title="🤝 Community Hub"
              description="Connect with others and build meaningful relationships"
              color="#dc2626"
            />
            <DashboardCard
              title="📊 Karma Dashboard"
              description="See your impact and contribution to the community"
              color="#7c3aed"
            />
            <DashboardCard
              title="🏠 Housing Initiative"
              description="Support housing solutions for those in need"
              color="#ea580c"
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#374151",
              padding: 15,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 30,
              marginBottom: 20,
            }}
            onPress={handleLogout}
          >
            <Text style={{ color: "#ffffff", fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

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

function DashboardCard({ title, description, color }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#ffffff",
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#e5e7eb",
          lineHeight: 20,
        }}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
}
