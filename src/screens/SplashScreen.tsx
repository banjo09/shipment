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

  // Container growth values
  const containerScale = useSharedValue(1);

  // Logo movement and scaling
  const topLogoY = useSharedValue(0);
  const bottomLogoY = useSharedValue(0);
  const topLogoScale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Step 1: Expand the container and logos together
    containerScale.value = withTiming(1.5, { duration: 1500 }, () => {
      // Step 2: Move logos upwards
      topLogoY.value = withTiming(-height / 2, { duration: 1000 });
      bottomLogoY.value = withTiming(-height / 2, { duration: 1000 });

      // Step 3: Expand top logo to full width and fade out
      topLogoScale.value = withTiming(4, { duration: 1000 }, () => {
        // Instantly show blue background
        opacity.value = withTiming(2, { duration: 0 }, () => {
          runOnJS(showNextScreen)();
        });
      });

    });
  }, []);

  const showNextScreen = () => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 1000);
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: containerScale.value }],
  }));

  const topLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: topLogoY.value },
      { scale: topLogoScale.value },
    ],
  }));

  const bottomLogoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomLogoY.value }],
  }));

  // const backgroundStyle = useAnimatedStyle(() => ({
  //   opacity: opacity.value,
  // }));
  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: opacity.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Animated Container */}
      <Animated.View style={[styles.logoContainer, containerStyle]}>
        <Animated.Image
          source={require('../assets/images/top.png')}
          style={[styles.logoTop, topLogoStyle]}
        />
        <Animated.Image
          source={require('../assets/images/bottom.png')}
          style={[styles.logoBottom, bottomLogoStyle]}
        />
      </Animated.View>

      {/* Blue Background Fading In */}
      <Animated.View style={[styles.blueScreen, backgroundStyle]} />
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

  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoTop: {
    width: 150,
    height: 50,
  },

  logoBottom: {
    width: 120,
    height: 80,
  },

  // logoTop: {
  //   position: 'absolute',
  //   // left: width / 2 - 20,
  //   // top: height / 2 - 20,
  //   left: width / 2 - 40,
  //   top: height / 2 - 80,
  //   // top: height / 2 - 40,
  //   // top: height / 2 + 140,
  //   width: 150,
  //   height: 50,
  // },
  // logoBottom: {
  //   position: 'absolute',
  //   // width: 90,
  //   // height: 50,
  //   width: 120,
  //   height: 80,
  //   // left: width / 2 - 80,
  //   // top: height / 2 + 35,
  //   left: width / 2 - 40,
  //   top: height / 2 + 20,
  //   // left: width / 2 - 150,
  //   // top: height / 2 - 300,
  // },

  blueScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2E50C1',
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0,
    transform: [{ scale: 0 }], // Start tiny, then expand
    // borderRadius: width, // Ensures smooth scaling
  },

  logo: {
    width: 120,
    height: 120,
  },
});

export default SplashScreen;
