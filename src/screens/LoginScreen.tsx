import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import LoginModal from '../components/LoginModal';

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('https://www.brandimic.com');
  const [email, setEmail] = useState('all@brandimic.com');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Simple validation
    if (!url || !email || !password) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    // If valid, proceed with your logic
    Alert.alert('Login Attempt', `URL: ${url}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      {/* Background Image or Color */}
      <View style={styles.background} />

      <Image
        source={require('../assets/images/shippexLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <LoginModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#2F50C1',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  loginButton: {
    position: 'absolute',
    bottom: 40,
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#2F50C1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;