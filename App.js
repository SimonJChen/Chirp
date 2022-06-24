import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ChatScreen from "./app/screens/ChatScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import colors from "./app/config/colors";

//assuming this acts as routes
const Stack = createNativeStackNavigator();
// return <ChatImageScreen />;
export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: colors.secondaryColor },
    headerTitleStyle: { color: colors.white },
    headerTintColor: colors.white,
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Chat Screen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
