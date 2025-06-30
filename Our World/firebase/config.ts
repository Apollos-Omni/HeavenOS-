// Mock Firebase for now to avoid web compatibility issues
export const auth = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    console.log("Mock login attempt:", email);
    return {
      user: {
        uid: "mock-user-123",
        email: email,
        karma: 50,
      },
    };
  },
};

export const db = {};
export const storage = {};
export const messaging = {};
