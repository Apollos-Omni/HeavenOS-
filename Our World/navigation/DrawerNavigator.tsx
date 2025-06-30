import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import GlobalFeed from "../screens/GlobalFeed";
import VisionBoard from "../screens/VisionBoard";
import ProfileScreen from "../screens/ProfileScreen";
import ActivityBoard from "../screens/ActivitiesBoard";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerStyle: { backgroundColor: "#000" },
        drawerLabelStyle: { fontSize: 16, fontWeight: "600" },
        drawerActiveTintColor: "#a855f7",
        drawerInactiveTintColor: "#fff",
        drawerIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "planet";

          switch (route.name) {
            case "Vision Board":
              iconName = "bulb";
              break;
            case "Profile":
              iconName = "person";
              break;
            case "Activity Board":
              iconName = "bar-chart";
              break;
            default:
              iconName = "planet";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="Global Feed" component={GlobalFeed} />
      <Drawer.Screen name="Vision Board" component={VisionBoard} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Activity Board" component={ActivityBoard} />
    </Drawer.Navigator>
  );
}
