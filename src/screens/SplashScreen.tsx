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
import { RootStackParamList } from '../navigation/AppNavigator';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Animation values
  const scale = useSharedValue(1);
  const topLogoY = useSharedValue(0);
  const bottomLogoY = useSharedValue(0);
  const topLogoScale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Step 1: Increase size together without overlap
    scale.value = withTiming(1.5, { duration: 1500 }, () => {
      // Step 2: Animate logos flying out
      topLogoY.value = withTiming(-height, { duration: 1000 });
      bottomLogoY.value = withTiming(-height * 0.5, { duration: 1000 });
      topLogoScale.value = withTiming(2, { duration: 1000 }, () => {
        runOnJS(showNextScreen)();
      });
    });
  }, []);

  const showNextScreen = () => {
    opacity.value = withTiming(1, { duration: 2500 });
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2500);
  };

  const topLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: topLogoY.value },
      { scale: scale.value * topLogoScale.value }, // Scale initially together, then top logo grows more
    ],
  }));

  const bottomLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bottomLogoY.value },
      { scale: scale.value }, // Scale only from first step
    ],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Logos Animating Out */}
      <Animated.Image
        source={require('../assets/images/top.png')} // Update with actual path
        style={[styles.logoTop, topLogoStyle]}
      />
      <Animated.Image
        source={require('../assets/images/bottom.png')} // Update with actual path
        style={[styles.logoBottom, bottomLogoStyle]}
      />

      {/* Blue Background Fading In */}
      <Animated.View style={[styles.blueScreen, backgroundStyle]}>
        {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
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

  logoTop: {
    position: 'absolute',
    // left: width / 2 - 20,
    // top: height / 2 - 20,
    left: width / 2 - 40,
    top: height / 2 - 80,
    // top: height / 2 - 40,
    // top: height / 2 + 140,
    width: 150,
    height: 50,
  },
  logoBottom: {
    position: 'absolute',
    // width: 90,
    // height: 50,
    width: 120,
    height: 80,
    // left: width / 2 - 80,
    // top: height / 2 + 35,
    left: width / 2 - 40,
    top: height / 2 + 20,
    // left: width / 2 - 150,
    // top: height / 2 - 300,
  },

  // logoTop: {
  //   position: 'absolute',
  //   left: width / 2 - 40,
  //   top: height / 2 + 140,
  // },
  // logoBottom: {
  //   position: 'absolute',
  //   left: width / 2 - 150,
  //   top: height / 2 - 300,
  // },

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
