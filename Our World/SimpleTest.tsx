import React from "react";

export default function SimpleTest() {
  return React.createElement(
    "div",
    {
      style: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ff6b6b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    "HELLO WORLD - APP IS WORKING! 🚀",
  );
}
