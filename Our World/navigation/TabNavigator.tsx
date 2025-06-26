import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VisionAuctionScreen from './screens/VisionAuctionScreen';
import RealityQuestChainScreen from './screens/RealityQuestChainScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { backgroundColor: '#111' }, tabBarActiveTintColor: '#a855f7' }}
    >
      <Tab.Screen name="Auctions" component={VisionAuctionScreen} />
      <Tab.Screen name="Quests" component={RealityQuestChainScreen} />
    </Tab.Navigator>
  );
}
