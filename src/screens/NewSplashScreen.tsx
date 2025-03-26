import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const NewSplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 3000); // 3 seconds splash screen duration

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Image
        source={require('../assets/images/top.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Your Tagline Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#6C63FF', // Purple color from design
    fontWeight: '500',
    marginTop: 10,
  },
});

export default NewSplashScreen;