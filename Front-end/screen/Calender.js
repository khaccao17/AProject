import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text } from 'react-native';
import axios from 'axios'; // Import axios for API requests

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reasonForAbsence, setReasonForAbsence] = useState(null); // State to store reason for absence

  // Function to fetch reason for absence for the selected date
  const fetchReasonForDate = async (date) => {
    try {
      const response = await axios.get(`http://192.168.1.14:4000/leaverequest/date/${date}`);
      setReasonForAbsence(response.data); // Set the reason for absence
    } catch (error) {
      console.error('Error fetching reason for absence: ', error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        // Your existing Calendar component props...
        onDayPress={(day) => {
          console.log('selected day', day);
          setSelectedDate(day.dateString); // Set the selected date
          fetchReasonForDate(day.dateString); // Fetch reason for absence for the selected date
        }}
      />
      {/* Render reason view when a date is selected */}
      {reasonForAbsence && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {reasonForAbsence.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>ID: {item._id}</Text>
              <Text>Reason: {item.reason}</Text>
              <Text>Reason: {item.status}</Text>
            </View>
          ))}
          <Text onPress={() => setReasonForAbsence(null)} style={{ color: 'blue', marginTop: 10 }}>Close</Text>
        </View>
      )}
    </View>
  );
};

export default CalendarScreen;
