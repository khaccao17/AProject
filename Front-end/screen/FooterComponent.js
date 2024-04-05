import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FooterComponent = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('Read'); 
  };

  const handleHomePress = () => {
    navigation.navigate('Create');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  const handleHeartPress = () => {
    navigation.navigate('Lich');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleHomePress}>
        <Ionicons name="home-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSearchPress}>
        <Ionicons name="search-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleHeartPress}>
        <Ionicons name="heart-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleLoginPress}>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleRegisterPress}>
        <Ionicons name="person-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#E9C69C',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 27,
  },
  iconText: {
    color: 'white',
  },
});

export default FooterComponent;
