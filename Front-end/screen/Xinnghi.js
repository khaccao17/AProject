import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput,ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const Xinnghi = ({ navigation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.14:4000/leaverequest/create', {
        startDate,
        endDate,
        reason,
      });
      console.log('Leave request submitted:', response.data);
      // Chuyển hướng sang màn hình LeaveInfoScreen sau khi gửi yêu cầu thành công
      navigation.navigate('LeaveInfo');
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Xin nghỉ</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date:</Text>
        <Button title="Select Start Date" onPress={showStartDatePickerModal} />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleStartDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Date:</Text>
        <Button title="Select End Date" onPress={showEndDatePickerModal} />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleEndDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reason:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter reason"
          value={reason}
          onChangeText={setReason}
          multiline
        />
      </View>
      <Button title="Gửi yêu cầu" onPress={handleSubmit} />
    </View>
    </ScrollView>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Xinnghi;
