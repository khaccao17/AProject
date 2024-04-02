import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:4000/employee');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Name: {item.name}</Text>
      <Text>Position: {item.position}</Text>
      <Text>Salary: {item.salary}</Text>
      <Image
        source={{ uri: item.image }}
        style={{ width: 200, height: 200, marginTop: 10 }}
      />
    </View>
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
});
