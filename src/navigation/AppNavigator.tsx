import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from '../screens/SplashScreen';
import MainTabNavigator from './MainTabNavigator';
import NewSplashScreen from '../screens/NewSplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        // component={SplashScreen}
        component={NewSplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;