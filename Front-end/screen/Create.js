import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    try {
      // Kiểm tra xác thực dữ liệu trước khi gửi yêu cầu
      if (!name || !position || !salary || !image) {
        Alert.alert('Missing Fields', 'Please fill in all fields.');
        return;
      }

      const response = await fetch('http://192.168.1.14:4000/employee/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, position, salary, image }),
      });

      if (response.ok) {
        console.log('Employee created successfully');
        // Thực hiện các hành động sau khi tạo thành công (nếu cần)
        Alert.alert('Success', 'Employee created successfully.');
        setName('');
        setPosition('');
        setSalary('');
        setImage('');
      } else {
        console.error('Failed to create employee');
        Alert.alert('Error', 'Failed to create employee.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Create" onPress={handleSubmit} />
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateEmployee;
