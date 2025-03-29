import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  Text,
  TextInputProps
} from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    // If input is focused or has a value, move label up; otherwise, move it down.
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedValue]);

  // Interpolate label position and size
  const labelY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [17, 8],
  });

  const labelFontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text
        style={[
          styles.label,
          labelStyle,
          {
            transform: [{ translateY: labelY }],
            fontSize: labelFontSize,
          },
        ]}
      >
        {label}
      </Animated.Text>

      <TextInput
        style={[styles.textInput, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 12,
  },
  label: {
    position: 'absolute',
    left: 12,
    color: '#666',
  },
  textInput: {
    // height: 50,
    height: 55,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 22,
    color: '#333',
  },
});

export default FloatingLabelInput;
