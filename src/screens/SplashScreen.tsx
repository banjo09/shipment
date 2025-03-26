import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../navigation/AppNavigator';

// type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const leftLogoY = useSharedValue(0);
  const rightLogoY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate logos flying out of the screen
    leftLogoY.value = withTiming(-height, { duration: 1000 });
    rightLogoY.value = withTiming(-height, { duration: 1000 }, () => {
      runOnJS(showNextScreen)();
    });
  }, []);

  const showNextScreen = () => {
    opacity.value = withTiming(1, { duration: 500 });
    setTimeout(() => {
      // navigation.replace('Home');
      // navigation.navigate('');
    }, 1500);
  };

  const leftLogoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: leftLogoY.value }],
  }));

  const rightLogoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rightLogoY.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Logos Animating Out */}
      <Animated.Image
        source={require('./assets/logo-left.png')} // Update with actual path
        style={[styles.logoLeft, leftLogoStyle]}
      />
      <Animated.Image
        source={require('./assets/logo-right.png')} // Update with actual path
        style={[styles.logoRight, rightLogoStyle]}
      />

      {/* Blue Background Fading In */}
      <Animated.View style={[styles.blueScreen, backgroundStyle]}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLeft: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: width / 2 - 60,
    top: height / 2 - 50,
  },
  logoRight: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: width / 2 - 40,
    top: height / 2 - 50,
  },
  blueScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2E50C1', // Blue color
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default SplashScreen;
