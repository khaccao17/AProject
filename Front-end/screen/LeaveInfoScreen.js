import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LeaveInfoScreen = ({ navigation }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:4000/leaverequest');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLeaveRequests();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLeaveRequestPress = (itemId, startDate, endDate, reason, status) => {
    navigation.navigate('Editleave', { itemId, startDate, endDate, reason, status });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave Info</Text>
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleLeaveRequestPress(item._id, item.startDate, item.endDate, item.reason, item.status)}
          >
            <Text>Start Date: {item.startDate}</Text>
            <Text>End Date: {item.endDate}</Text>
            <Text>Reason: {item.reason}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default LeaveInfoScreen;
