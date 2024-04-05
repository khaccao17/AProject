import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './screen/Navbar';
import HeaderComponent from './screen/HeaderComponet';
import FooterComponent from './screen/FooterComponent';
import CreateScreen from './screen/Create';
import Read from './screen/Read';
import LeaveInfoScreen from './screen/LeaveInfoScreen';
import Xinnghi from './screen/Xinnghi';
import Register from './screen/Register';
import LoginScreen from './screen/Login';
import Editleave from './screen/Editleave';
import CalendarScreen from './screen/Calender';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainApp} options={{ headerShown: false }} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Read" component={Read} />
        <Stack.Screen name="LeaveInfo" component={LeaveInfoScreen} />
        <Stack.Screen name="Xinnghi" component={Xinnghi} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="App" component={MainApp} />
        <Stack.Screen name="Editleave" component={Editleave}/>
        <Stack.Screen name="Calender" component={CalendarScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainApp() {
  const navigation = useNavigation();
  const [controls, setControls] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchControls = async () => {
      try {
        const response = await fetch('http://192.168.1.14:3001/control');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setControls(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchControls();

    // Lấy tên người dùng từ AsyncStorage
    const getUsername = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Gửi yêu cầu API để lấy thông tin người dùng
        try {
          const response = await axios.get('http://192.168.1.14:4000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Text style={styles.serviceText}>Tạo Dịch Vụ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LeaveInfo')}>
        <Text style={styles.serviceText}>Leave Info</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Xinnghi')}>
        <Text style={styles.serviceText}>Xin Nghỉ</Text>
      </TouchableOpacity>
      {username && <Text style={styles.serviceText}>Xin chào, {username}</Text>}
      <HeaderComponent />
      <FlatList
        data={controls}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemText}>Price: {item.price}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          </View>
        )}
      />
      <FooterComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black', // Đổi màu chữ thành màu đen
  },
  listItem: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // Đổi màu chữ thành màu đen
  },
  itemText: {
    color: 'black', // Đổi màu chữ thành màu đen
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});
