
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ServiceDetailScreen = ({ route }) => {
  // Lấy thông tin của dịch vụ từ route.params
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.detail}>OK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});

export default ServiceDetailScreen;
