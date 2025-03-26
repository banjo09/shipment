import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TabBarIconProps = {
  route: any;
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ route, focused, color, size }) => {
  let iconName = 'alert';;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outlined';
  } else if (route.name === 'Search') {
    iconName = focused ? 'search' : 'search';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={iconName} size={size} color={color} />
      {focused && (
        <View
          style={{
            position: 'absolute',
            bottom: -6,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: color,
          }}
        />
      )}
    </View>
  );
};

export default TabBarIcon;