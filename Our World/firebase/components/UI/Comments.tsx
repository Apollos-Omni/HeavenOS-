import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../hooks/useAuth';

export default function Comments({ visionId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'comments', visionId, 'list'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(q, snap => {
      setComments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const sendComment = async () => {
    await addDoc(collection(db, 'comments', visionId, 'list'), {
      userId: user.uid,
      text,
      timestamp: new Date(),
      karma: 0
    });
    setText('');
  };

  return (
    <View className="p-4 bg-black">
      {comments.map(c => (
        <Text key={c.id} className="text-white mb-1">💬 {c.text}</Text>
      ))}
      <TextInput
        placeholder="Type comment..."
        value={text}
        onChangeText={setText}
        className="bg-gray-900 text-white p-2 mt-2 rounded"
      />
      <Button title="Send" onPress={sendComment} />
    </View>
  );
}
