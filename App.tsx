/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import { StatusBar } from 'react-native';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { SafeAreaProvider, SafAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
// import MainTabNavigator from './navigation/MainTabNavigator';



const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <MainTabNavigator /> */}
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

