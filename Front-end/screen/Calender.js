import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';

const Xinnghi1 = ({ route }) => {
    const [markedDates, setMarkedDates] = useState({}); // Danh sách các ngày đã đánh dấu
    const [selectedDate, setSelectedDate] = useState(null); // Ngày được chọn từ lịch
    const [leaveRequests, setLeaveRequests] = useState([]); // Danh sách các leave request của nhân viên trong ngày được chọn

    useEffect(() => {
        fetchLeaveRequests(); // Fetch leave requests khi component được mount
    }, [selectedDate]); // Trigger lại fetchLeaveRequests khi selectedDate thay đổi

    const fetchLeaveRequests = async () => {
        try {
            if (selectedDate) {
                // Nếu selectedDate tồn tại, fetch leave requests của ngày đó
                const response = await axios.get(`http://192.168.1.14:4000/leaverequest/date/${selectedDate}`);
                setLeaveRequests(response.data);
            }
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };

    const fetchMarkedDates = async () => {
        try {
            // Fetch danh sách các ngày đã nghỉ phép của nhân viên
            const response = await axios.get(`http://192.168.1.14:4000/leaverequest/markdates`);
            const markedDatesData = response.data.reduce((markedDatesObj, leaveRequest) => {
                // Đánh dấu các ngày đã nghỉ phép
                markedDatesObj[leaveRequest.startDate] = { marked: true, dotColor: 'blue' };
                return markedDatesObj;
            }, {});
            setMarkedDates(markedDatesData);
        } catch (error) {
            console.error('Error fetching marked dates:', error);
        }
    };

    const handleDayPress = (day) => {
        // Xử lý khi người dùng chọn một ngày trên lịch
        setSelectedDate(day.dateString);
    };

    useEffect(() => {
        fetchMarkedDates(); // Fetch danh sách các ngày đã nghỉ phép khi component được mount
    }, []); // Chỉ chạy một lần khi component được mount

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Chọn Ngày</Text>
                <Calendar
                    onDayPress={handleDayPress} // Callback khi người dùng chọn một ngày trên lịch
                    markedDates={markedDates} // Danh sách các ngày đã đánh dấu
                />
                {selectedDate && (
                    <>
                        <Text style={styles.title}>Leave Request Details for {selectedDate}</Text>
                        {leaveRequests.length > 0 ? (
                            leaveRequests.map((leaveRequest, index) => (
                                <View key={index} style={styles.leaveRequest}>
                                    <Text>Nhân viên: {leaveRequest.employeeId}</Text>
                                    <Text>Lý do: {leaveRequest.reason}</Text>
                                    <Text>Trạng thái: {leaveRequest.status}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noData}>Không có ai nghỉ phép vào ngày này.</Text>
                        )}
                    </>
                )}
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
        marginTop: 20,
        marginBottom: 10,
    },
    leaveRequest: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    noData: {
        fontSize: 16,
        marginTop: 20,
        fontStyle: 'italic',
    },
});

export default Xinnghi1;
