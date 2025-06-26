export default function RegisterCitizen() {
    const [name, setName] = useState('');
    const [vision, setVision] = useState('');
    const user = useAuthStore(state => state.user);
    const navigation = useNavigation();
  
    const handleSubmit = async () => {
      const uid = user.uid;
      const docRef = doc(db, 'citizens', uid);
  
      await setDoc(docRef, {
        uid,
        name,
        visionPledge: vision,
        karmaScore: 100,
        influenceScore: 0,
        citizenshipTier: 'Initiate',
        registered: serverTimestamp(),
        wallet: {
          heavenCoin: 100,
          equityTokens: 0,
          barterCredits: 0
        }
      });
  
      navigation.navigate('Home');
      Alert.alert("Welcome", "You are now a citizen of Karma Nation.");
    };
  
    return (
      <ScrollView className="bg-black p-6">
        <Text className="text-white text-2xl mb-4">Join Karma Nation</Text>
  
        <TextInput
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          className="bg-white p-3 rounded mb-3"
        />
  
        <TextInput
          placeholder="What’s your life’s vision?"
          value={vision}
          onChangeText={setVision}
          className="bg-white p-3 rounded mb-6"
          multiline
          numberOfLines={4}
        />
  
        <Button title="Register as Citizen" color="#a855f7" onPress={handleSubmit} />
      </ScrollView>
    );
  }
  