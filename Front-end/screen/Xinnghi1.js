import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const Xinnghi1 = ({ route }) => {
    const { employeeId } = route.params;
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [startDate, setStartDate] = useState(new Date()); // Khởi tạo startDate với giá trị là ngày hiện tại
    const [endDate, setEndDate] = useState(new Date()); // Khởi tạo endDate với giá trị là ngày hiện tại
    const [reason, setReason] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        fetchEmployeeInfo();
    }, []);

    const fetchEmployeeInfo = async () => {
        try {
            const response = await axios.get(`http://192.168.1.14:4000/employee/${employeeId}`);
            setEmployeeInfo(response.data);
        } catch (error) {
            console.error('Error fetching employee info:', error);
        }
    };

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

    const handleLeaveRequest = async () => {
        try {
            const response = await axios.post('http://192.168.1.14:4000/leaverequest/create', {
                employeeId,
                startDate,
                endDate,
                reason,
            });
            console.log('Leave request created:', response.data);
            // Xử lý sau khi tạo đơn xin nghỉ thành công, ví dụ: hiển thị thông báo, chuyển hướng, vv.
        } catch (error) {
            console.error('Error creating leave request:', error);
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Xin Nghỉ</Text>
            {employeeInfo && (
                <Text style={styles.employeeName}>Nhân viên: {employeeInfo.name}</Text>
            )}
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
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Lý do"
                multiline
                numberOfLines={4}
                value={reason}
                onChangeText={setReason}
            />
            <TouchableOpacity style={styles.button} onPress={handleLeaveRequest}>
                <Text style={styles.buttonText}>Gửi Đơn Xin Nghỉ</Text>
            </TouchableOpacity>
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
    employeeName: {
        fontSize: 18,
        marginBottom: 10,
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
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Xinnghi1;
