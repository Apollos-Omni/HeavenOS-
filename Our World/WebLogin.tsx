import React, { useState } from "react";
import { View, Text } from "react-native";

export default function WebLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    console.log("Login clicked!");
    const userName = email ? email.split("@")[0] : "Demo User";
    setUser({
      email: email || "demo@ourworld.com",
      name: userName,
      karma: 150,
    });
    setIsLoggedIn(true);
    alert(`Welcome ${userName}! Logging you in...`);
  };

  const handleTest = () => {
    alert("Test button works!");
  };

  if (isLoggedIn && user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f0f23",
          color: "white",
          padding: "20px",
        }}
      >
        <h1>🌍 Welcome to Our World Dashboard</h1>
        <p>
          User: {user.name} | Karma: {user.karma}
        </p>

        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          <div
            onClick={() =>
              alert(
                "🌟 Vision Board: Create and share your dreams!\n\n• Post your visions for the future\n• Get community support\n• Track your progress",
              )
            }
            style={{
              backgroundColor: "#4f46e5",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            <h3>🌟 Vision Board</h3>
            <p>Share your dreams and aspirations</p>
            <small style={{ opacity: 0.8 }}>Click to explore →</small>
          </div>

          <div
            onClick={() =>
              alert(
                "🧘 Mental Wellness Hub:\n\n• Daily mood tracking\n• Meditation guides\n• Therapy resources\n• Community support groups\n• Crisis helplines",
              )
            }
            style={{
              backgroundColor: "#059669",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            <h3>🧘 Mental Wellness</h3>
            <p>Track your mental health journey</p>
            <small style={{ opacity: 0.8 }}>Click to explore →</small>
          </div>

          <div
            onClick={() =>
              alert(
                "🤝 Community Hub:\n\n• Connect with like-minded people\n• Join support groups\n• Local meetups\n• Volunteer opportunities\n• Peer mentorship",
              )
            }
            style={{
              backgroundColor: "#dc2626",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            <h3>🤝 Community Hub</h3>
            <p>Connect with others</p>
            <small style={{ opacity: 0.8 }}>Click to explore →</small>
          </div>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            backgroundColor: "#374151",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "white", marginBottom: "40px" }}>
        ✨ Our World App ✨
      </h1>

      <div
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleTest}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🧪 Test Button
        </button>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login to Our World
        </button>
      </div>
    </div>
  );
}
