import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import AnimatedPressable from "./AnimatedPressable";
import TextInputWithValidation from "../components/TextInputWithValidation";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import useAuthStore from "../store/AuthStore";
import { pickAndUploadImage } from "../utils/uploadImage";
import { incrementKarma, incrementInfluence } from "../utils/karmaEngine";
import { canModerate } from "../utils/permissions";

export default function VisionBoard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [visions, setVisions] = useState<any[]>([]);
  const user = useAuthStore((state) => state.user);

  const canSubmit = title.trim().length > 0 && description.trim().length > 0;

  useEffect(() => {
    fetchVisions();
  }, []);

  const fetchVisions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "visions"));
      const fetchedVisions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVisions(fetchedVisions);
    } catch (error: any) {
      Alert.alert("Error fetching visions", error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await pickAndUploadImage("visions");
      }

      await addDoc(collection(db, "visions"), {
        title,
        description,
        imageUrl,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });

      await incrementKarma(user.uid, 10);
      await incrementInfluence(user.uid, 5);

      Alert.alert("Success", "Your vision has been posted!");
      setTitle("");
      setDescription("");
      setImage(null);
      fetchVisions();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  const handleDelete = async (postId: string) => {
    if (canModerate(user.role)) {
      try {
        const postRef = doc(db, "visions", postId);
        await deleteDoc(postRef);
        setVisions((prev) => prev.filter((post) => post.id !== postId));
        Alert.alert("Deleted", "Vision post deleted.");
      } catch (error: any) {
        Alert.alert("Error deleting post", error.message);
      }
    } else {
      Alert.alert(
        "Unauthorized",
        "You do not have permission to delete this post.",
      );
    }
  };

  const handleSelectImage = async () => {
    try {
      const uploaded = await pickAndUploadImage("visions");
      if (uploaded) setImage(uploaded);
    } catch (error: any) {
      Alert.alert("Image Upload Failed", error.message);
    }
  };

  const handleRemoveImage = () => setImage(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.header}>Share Your Vision</Text>

      <TextInputWithValidation
        label="Title"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      <TextInputWithValidation
        label="Description"
        value={description}
        onChangeText={setDescription}
        maxLength={500}
        multiline
      />

      <AnimatedPressable onPress={handleSelectImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </AnimatedPressable>

      {image && (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.image} />
          <AnimatedPressable
            onPress={handleRemoveImage}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>Remove Image</Text>
          </AnimatedPressable>
        </View>
      )}

      <AnimatedPressable
        disabled={!canSubmit}
        onPress={handleSubmit}
        style={[styles.button, !canSubmit && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Submit Vision</Text>
      </AnimatedPressable>

      <Text style={styles.sectionTitle}>Your Visions</Text>

      <FlatList
        data={visions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.visionCard}>
            <Text style={styles.visionTitle}>{item.title}</Text>
            <Text style={styles.visionDesc}>{item.description}</Text>
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.visionImage}
                resizeMode="cover"
              />
            )}
            {canModerate(user.role) && (
              <AnimatedPressable
                onPress={() => handleDelete(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteText}>Delete Post</Text>
              </AnimatedPressable>
            )}
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: {
    color: "#a855f7",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#9333ea",
    padding: 14,
    borderRadius: 8,
    marginVertical: 12,
  },
  disabledButton: { backgroundColor: "#5b21b6" },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
  imageWrapper: { marginVertical: 12, alignItems: "center" },
  image: { width: "100%", height: 200, borderRadius: 10 },
  removeButton: {
    marginTop: 8,
    backgroundColor: "#ef4444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeText: { color: "#fff", fontWeight: "600" },
  visionCard: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  visionTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  visionDesc: { color: "#d1d5db", marginTop: 4, marginBottom: 8 },
  visionImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  deleteBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
