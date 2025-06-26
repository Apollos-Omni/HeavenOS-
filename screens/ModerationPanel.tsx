export default function ModerationPanel() {
    const [flags, setFlags] = useState([]);
  
    useEffect(() => {
      const fetchFlags = async () => {
        const snapshot = await getDocs(collection(db, 'flags'));
        setFlags(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
  
      fetchFlags();
    }, []);
  
    return (
      <ScrollView className="bg-black p-4">
        <Text className="text-white text-3xl">Moderation Panel</Text>
        {flags.map(flag => (
          <View key={flag.id} className="bg-gray-800 p-3 mt-2 rounded">
            <Text className="text-white">{flag.reason}</Text>
            <Text className="text-purple-400">Post ID: {flag.postId}</Text>
            <Text className="text-purple-300">Flagged by: {flag.userId}</Text>
            <Button title="Remove Post" onPress={() => deleteDoc(doc(db, 'visions', flag.postId))} />
          </View>
        ))}
      </ScrollView>
    );
  }
  