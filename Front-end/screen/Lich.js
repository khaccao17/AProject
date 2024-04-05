import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const Lich = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Ngày được chọn từ lịch
  const [leaveRequests, setLeaveRequests] = useState([]); // Danh sách các leave request của nhân viên trong ngày được chọn

  const handleDayPress = async (day) => {
    try {
      // Fetch leave requests của ngày được chọn
      const response = await axios.get(`http://192.168.1.14:4000/leaverequest/date/${day.dateString}`);
      const requestsWithNames = await Promise.all(response.data.map(async (leaveRequest) => {
        const employeeName = await fetchEmployeeName(leaveRequest.employeeId);
        return { ...leaveRequest, employeeName };
      }));
      setLeaveRequests(requestsWithNames);
      setSelectedDate(day.dateString);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const fetchEmployeeName = async (employeeId) => {
    try {
      const response = await axios.get(`http://192.168.1.14:4000/employee/${employeeId}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching employee name:', error);
      return 'Unknown';
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Chọn Ngày</Text>
        <Calendar
          onDayPress={handleDayPress} // Callback khi người dùng chọn một ngày trên lịch
        />
        {selectedDate && (
          <View style={styles.leaveRequestsContainer}>
            <Text style={styles.title}>Leave Requests for {selectedDate}</Text>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((leaveRequest, index) => (
                <View key={index} style={styles.leaveRequest}>
                  <Text>Nhân viên: {leaveRequest.employeeName}</Text>
                  <Text>Lý do: {leaveRequest.reason}</Text>
                  <Text>Trạng thái: {leaveRequest.status}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>Không có ai nghỉ phép vào ngày này.</Text>
            )}
          </View>
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
  leaveRequestsContainer: {
    marginTop: 20,
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

export default Lich;
