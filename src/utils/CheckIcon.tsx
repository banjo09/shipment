import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

interface CheckIconProps {
  size?: number;
  isChecked: boolean;
  isToggle?: boolean;
  onPress: () => void;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  size = 40,
  isChecked,
  isToggle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderColor: !isToggle && isChecked ?
              '#6E91EC' : isToggle && isChecked ?
                '#2F50C1' : '#D0D5DD',
            backgroundColor: isChecked ? '#D9E6FD' : '#FFFFFF',
            borderRadius: 5,
            borderWidth: 1,
          },
        ]}
      >
        {isChecked && (
          <Svg width={size * 0.8} height={size * 0.8} viewBox="0 0 24 24" fill="none">
            <Path
              d="M5 13L9 17L19 7"
              stroke={isToggle ? '#2F50C1' : '#6E91EC'}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

export default CheckIcon;
