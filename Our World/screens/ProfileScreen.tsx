import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import useAuthStore from "../store/AuthStore";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      setData(snap.data());
    };

    loadData();
  }, []);

  return (
    <View className="bg-black flex-1 p-4">
      <Image source={{ uri: data.avatar }} className="w-24 h-24 rounded-full" />
      <Text className="text-white text-2xl mt-2">{data.name}</Text>
      <Text className="text-purple-400">Karma: {data.karma}</Text>
      <Text className="text-purple-300">Influence: {data.influence}</Text>
      <Text className="text-white">Visions: {data.visionCount}</Text>
      <Text className="text-yellow-500 italic">Role: {data.role}</Text>
    </View>
  );
}
