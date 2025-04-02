import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LoginModal from '../components/LoginModal';

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

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