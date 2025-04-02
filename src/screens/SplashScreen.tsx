import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { SplashScreenNavigationProp } from '../types/navigation';


const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const containerScale = useSharedValue(1);

  const topLogoY = useSharedValue(0);
  const bottomLogoY = useSharedValue(0);
  const topLogoScale = useSharedValue(1);
  const backgroundOpacity = useSharedValue(0);
  const bottomLogoX = useSharedValue(0);

  useEffect(() => {
    // Step 1: Expand the container and logos together
    containerScale.value = withTiming(2.5, { duration: 1500 }, () => {
      // Step 2: Start moving logos up
      topLogoY.value = withTiming(-height / 2, { duration: 1000 });
      bottomLogoY.value = withTiming(-height / 1.8, { duration: 1000 });
      bottomLogoX.value = withTiming(-height / 2, { duration: 1000 });


      // Step 3: Fade in the background **while** logos move up
      backgroundOpacity.value = withTiming(1, { duration: 800 });

      // Step 4: Expand top logo to full width and fade out
      topLogoScale.value = withTiming(8, { duration: 1000 }, () => {
        runOnJS(showNextScreen)();
      });
    });
  }, []);

  const showNextScreen = () => {
    setTimeout(() => {
      navigation.replace('Login');
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
    transform: [
      { translateY: bottomLogoY.value },
      { translateX: bottomLogoX.value },
    ],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.blueScreen, backgroundStyle]} />

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
    justifyContent: 'center',
  },

  logoTop: {
    width: 83,
    height: 25,
    marginLeft: 4.0,
  },

  logoBottom: {
    marginTop: 1.5,
    width: 90,
    height: 50,
  },

  blueScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2F50C1',
    opacity: 0, // Start transparent, then fade in
  },
});

export default SplashScreen;
