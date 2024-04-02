import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Editleave = ({ route, navigation }) => {
  const { itemId, startDate, endDate, reason, status } = route.params;
  const [newStatus, setNewStatus] = useState(status);

  const handleSave = async () => {
    try {
      // Gửi yêu cầu cập nhật trạng thái mới lên server
      await axios.put(`http://192.168.1.12:4000/leaverequest/${itemId}/status`, {
        status: newStatus,
      });
      // Load lại trang LeaveInfo sau khi cập nhật thành công
      navigation.navigate('LeaveInfo');
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Leave Request</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date:</Text>
        <Text>{startDate}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Date:</Text>
        <Text>{endDate}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reason:</Text>
        <Text>{reason}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.label}>Status:</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Pending"
            onPress={() => setNewStatus('pending')}
            color={newStatus === 'pending' ? 'blue' : 'gray'}
          />
          <Button
            title="Approved"
            onPress={() => setNewStatus('approved')}
            color={newStatus === 'approved' ? 'blue' : 'gray'}
          />
          <Button
            title="Rejected"
            onPress={() => setNewStatus('rejected')}
            color={newStatus === 'rejected' ? 'blue' : 'gray'}
          />
        </View>
      </View>
      <Button title="Save" onPress={handleSave} />
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default Editleave;
