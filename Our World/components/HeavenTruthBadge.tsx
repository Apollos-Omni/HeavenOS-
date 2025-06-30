export default function HeavenTruthBadge({ rank }) {
    const badgeColor = rank >= 9 ? "#22c55e" : rank >= 7 ? "#eab308" : "#ef4444";
    const label = rank === 10 ? "Universal Truth" :
                  rank >= 8 ? "Regionally Verified" :
                  "Disputed";
    return (
      <View className="flex-row items-center space-x-2">
        <View className={`w-4 h-4 rounded-full`} style={{ backgroundColor: badgeColor }} />
        <Text className="text-white text-sm">{label} ({rank}/10)</Text>
      </View>
    );
  }
  