import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShipmentsScreen from '../screens/ShipmentsScreen';
import ScanScreen from '../screens/ScanScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Shipments') {
            iconName = 'local-shipping';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Scan') {
            return <FontAwesome name="qrcode" size={size} color={color} />;
          } else if (route.name === 'Wallet') {
            iconName = 'account-balance-wallet';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'person';
            return <Icon name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#2F50C1',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#EEE',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Shipments" component={ShipmentsScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;








































// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { HomeScreen, SearchScreen, ProfileScreen } from '../screens';
// import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';

// const Tab = createBottomTabNavigator();

// const MainTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => (
//           <TabBarIcon route={route} focused={focused} color={color} size={size} />
//         ),
//         tabBarActiveTintColor: '#2F50C1', 
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
//       {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
//     </Tab.Navigator>
//   );
// };

// export default MainTabNavigator;