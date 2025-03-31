import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  Text,
  TextInputProps,
} from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
  prefix?: string;
  prefixStyle?: object;
  error?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  prefix,
  prefixStyle,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<TextInput>(null);

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

  const labelColor = isFocused ? '#58536E' : '#A7A3B3';
  const borderColor = isFocused ? 'rgba(47, 80, 193, 1)' : 'rgba(244, 242, 248, 0.5)';


  const handleLabelPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View
      // style={[styles.container, containerStyle, { borderColor }]}
      style={[
        styles.container,
        containerStyle,
        {
          borderColor: error ? '#D12030' :
            isFocused ? 'rgba(47, 80, 193, 1)' :
              'rgba(244, 242, 248, 0.5)'
        }
      ]}
      onTouchStart={handleLabelPress}
    >
      <Animated.Text
        style={[
          styles.label,
          labelStyle,
          {
            transform: [{ translateY: labelY }],
            fontSize: labelFontSize,
            // color: labelColor,
            color: error ? '#D12030' : labelColor,
          },
        ]}
      >
        {label}
      </Animated.Text>

      <View style={styles.inputWrapper}>
        {prefix && (isFocused || value) && (
          <Text
            style={[
              styles.prefix,
              { color: error ? '#D12030' : labelColor },
              prefixStyle
            ]}
          >
            {prefix} <Text
              style={styles.prefixSlash}
            >| </Text>
          </Text>
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.textInput,
            inputStyle,
            prefix && styles.prefixInput,
            { color: error ? '#D12030' : '#2F50C1' }
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

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
    // paddingHorizontal: 12,
    // paddingTop: 22,
    paddingTop: 22,
    color: '#2F50C1',
  },


  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 12,
  },
  prefix: {
    fontSize: 16,
    // marginLeft: 12,
    paddingTop: 22,
  },
  prefixInput: {
    // paddingLeft: 8,
    // flex: 1, // Take remaining space
  },
  prefixSlash: {
    color: 'rgba(21, 72, 118, 0.2)',
  },
  errorText: {
    color: '#D12030',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 8,
  },
});

export default FloatingLabelInput;
