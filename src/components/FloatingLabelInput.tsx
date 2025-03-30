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
    outputRange: [2, -7],
  });

  const labelFontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  // const labelColor = isFocused ? '#666' : '#999';
  const labelColor = isFocused ? '#58536E' : '#A7A3B3';
  const borderColor = isFocused ? 'rgba(47, 80, 193, 1)' : 'rgba(244, 242, 248, 0.5)';
  const textColor = '#3366FF';
  const backgroundColor = '#F7F7F9';

  return (
    <View style={[styles.container, containerStyle, { borderColor }]}>
      <Animated.Text
        style={[
          styles.label,
          labelStyle,
          {
            transform: [{ translateY: labelY }],
            fontSize: labelFontSize,
            color: labelColor,
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
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 242, 248, 0.5)'
  },
  label: {
    position: 'absolute',
    top: 17,
    left: 12,
    // color: '#666',
  },
  textInput: {
    // height: 50,
    height: 55,
    fontSize: 16,
    paddingHorizontal: 12,
    // paddingTop: 22,
    paddingTop: 22,
    color: '#2F50C1',
  },
});

export default FloatingLabelInput;
