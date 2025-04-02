import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingLabelInput from './FloatingLabelInput';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { login } from '../services/apiService';
import { LoginModalProps, LoginScreenNavigationProp } from '../types/navigation';


const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    url: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const buttonAnim = useRef(new Animated.Value(0)).current;


  // Use to monitor if the component is mounted
  // This is to prevent memory leaks when navigating away from the screen
  // and the component is still trying to animate
  const isMounted = useRef(false);

  const triggerExitAnimation = () => {
    Animated.timing(buttonAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    isMounted.current = true;

    // Set up navigation listener for when screen is blurring (navigating away)
    const unsubscribe = navigation.addListener('blur', () => {
      if (isMounted.current && visible) {
        triggerExitAnimation();
      }
    });

    return () => {
      // isMounted.current = false;
      unsubscribe();
    };
  }, [navigation, visible]);

  // useEffect(() => {
  //   if (visible) {
  //     // Reset animation when modal becomes visible
  //     buttonAnim.setValue(0);
  //   } else {
  //     triggerExitAnimation();
  //   }
  // }, [visible]);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setDisplayPassword("●".repeat(text.length));
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      url: '',
      email: '',
      password: ''
    };

    if (!url.trim()) {
      newErrors.url = 'URL is required';
      valid = false;
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(url.replace(/^https?:\/\//, ''))) {
      newErrors.url = 'Please enter a valid domain (e.g., "example.com")';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    console.log('newErrors', newErrors)

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    navigation.replace('MainApp');

    if (validateForm()) {
      // console.log('Logging in with:', { url, email, password });
      // navigation.replace('MainApp');

      setLoading(true);
      setLoginError(null);

      try {
        const response = await login(email, password);
        console.log('Login successful:', response);

        // Store the session/token if needed
        // await AsyncStorage.setItem('authToken', response.token);

        navigation.replace('MainApp');
      } catch (error) {
        console.error('Login failed:', error);
        // Alert.alert('Login Failed', 'Invalid credentials or network error');
        setLoginError('Invalid credentials or network error');
      } finally {
        setLoading(false);
      }
    }
  };
  const disabledValue = !url.trim() || !email.trim() || !password.trim() ||
    Object.values(errors).some(error => error !== '')

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Icon name="arrow-back" size={24} color="#4561DB" />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.loginTitle}>Login</Text>
            <Text style={styles.instructionText}>
              Please enter your First, Last name and your phone number in order to register
            </Text>
            <FloatingLabelInput
              label="URL"
              value={url}
              onChangeText={(text) => {
                setUrl(text);
                if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
              }}
              keyboardType="url"
              autoCapitalize="none"
              prefix="https://"
              error={errors.url}
            />

            <FloatingLabelInput
              label="Username / Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <FloatingLabelInput
              label="Password"
              value={displayPassword}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              error={errors.password}
            />

          </ScrollView>

          <Animated.View
            style={{
              transform: [{
                translateY: buttonAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 100]
                })
              }],
              opacity: buttonAnim.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [1, 0.5, 0]
              })
            }}
          >
            <TouchableOpacity
              disabled={disabledValue || loading}
              style={[
                styles.loginButton,
                disabledValue && { backgroundColor: '#EAE7F2' }
              ]}
              onPress={handleLogin}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            {loginError && (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                {loginError}
              </Text>
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: Dimensions.get('window').height * 0.9,
  },
  modalHeader: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    color: '#4561DB',
    fontSize: 16,
    marginLeft: 5,
  },
  scrollContent: {
    // flex: 1,
    // backgroundColor: 'red',
    // height: '95%',
    height: '100%',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2F50C1',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginModal;