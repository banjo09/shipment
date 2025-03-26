import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { HomeScreen, SearchScreen, ProfileScreen } from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#6C63FF', // Purple color from the design
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;