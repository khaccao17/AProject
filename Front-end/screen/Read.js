import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:4000/employee');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleLeaveRequest = (employeeId) => {
    navigation.navigate('Xinnghi1', { employeeId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLeaveRequest(item._id)}>
      <View style={styles.item}>
        <Text style={styles.title}>Name: {item.name}</Text>
        <Text>Position: {item.position}</Text>
        <Text>Salary: {item.salary}</Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
        {/* Thêm nút "Xin nghỉ" */}
        <TouchableOpacity style={styles.leaveRequestButton} onPress={() => handleLeaveRequest(item._id)}>
          <Text style={styles.buttonText}>Xin nghỉ</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Info</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  leaveRequestButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
