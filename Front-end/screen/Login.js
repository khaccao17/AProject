import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Thực hiện yêu cầu API đến máy chủ backend để xác thực người dùng
      const response = await axios.post('http://192.168.1.12:4000/register/login', { username, password });
      
      // Kiểm tra dữ liệu phản hồi từ backend
      if (response.data.message === 'Login successful') {
        // Nếu đăng nhập thành công, hiển thị thông báo và chuyển hướng sang trang App.js
        Alert.alert('Login Successful', 'Welcome!');
        navigation.navigate('App');
      } else {
        // Nếu không thành công, hiển thị thông báo lỗi
        Alert.alert('Login Failed', response.data.message);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred while logging in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
