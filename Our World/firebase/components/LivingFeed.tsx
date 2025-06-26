import Animated from 'react-native-reanimated';
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const LivingFeed = ({ feedData }) => (
  <Animated.FlatList
    entering={FadeInRight.springify().delay(100)}
    exiting={FadeOutLeft.duration(300)}
    data={feedData}
    renderItem={({ item }) => <VisionCard item={item} />}
    keyExtractor={(item) => item.id}
  />
);
