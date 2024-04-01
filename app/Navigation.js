import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListTitle from "./component/ListTitle";

const HomeStack = createNativeStackNavigator();
const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ListTitle" component={ListTitle} />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabGroup = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "red",
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorite" component={Home} />
      <Tab.Screen name="Setting" component={Home} />
    </Tab.Navigator>
  );
};

export function Navigation() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}
