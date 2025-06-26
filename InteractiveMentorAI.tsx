// InteractiveMentorAI.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Animated,
} from 'react-native';
import AnimatedMentorAvatar from './AnimatedMentorAvatar'; // Custom avatar component
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import openai from '../utils/openaiClient'; // OpenAI API wrapper

type Message = {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp?: any;
};

interface Props {
  userId: string;
}

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InteractiveMentorAI({ userId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!userId) return;

    const messagesRef = collection(db, 'mentorChats', userId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...(doc.data() as Message) });
      });
      setMessages(msgs);
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => unsubscribe();
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim() || !userId) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsThinking(true);

    const messagesRef = collection(db, 'mentorChats', userId, 'messages');

    const userMsg = {
      sender: 'user' as const,
      text: input.trim(),
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(messagesRef, userMsg);
      setInput('');

      const promptMessages = messages
        .map((m) => `${m.sender === 'user' ? 'User' : 'Mentor'}: ${m.text}`)
        .join('\n');
      const prompt = `${promptMessages}\nUser: ${userMsg.text}\nMentor:`;

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150,
        temperature: 0.7,
        stop: ['User:', 'Mentor:'],
      });

      const gptText = response.data.choices[0].text?.trim() || 'I am here to guide you.';

      const mentorMsg = {
        sender: 'mentor' as const,
        text: gptText,
        timestamp: serverTimestamp(),
      };

      await addDoc(messagesRef, mentorMsg);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsThinking(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.messageContainer,
          item.sender === 'user' ? styles.userMsg : styles.mentorMsg,
          { opacity: fadeAnim },
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <AnimatedMentorAvatar
        message={messages.length > 0 ? messages[messages.length - 1].text : 'Welcome! Ask me anything.'}
        mood={isThinking ? 'thinking' : 'inspired'}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            { height: Math.min(120, Math.max(40, input.split('\n').length * 24)) },
          ]}
          value={input}
          onChangeText={setInput}
          placeholder="Ask MentorAI..."
          placeholderTextColor="#666"
          editable={!isThinking}
          multiline
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={isThinking}
          style={styles.sendBtn}
          activeOpacity={0.7}
        >
          {isThinking ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.sendText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  chatContainer: { paddingHorizontal: 20, paddingBottom: 10 },
  messageContainer: {
    marginVertical: 6,
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#9333ea',
  },
  mentorMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#4ade80',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#222',
    backgroundColor: '#111',
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#eee',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 12,
    backgroundColor: '#a855f7',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: '700',
  },
});