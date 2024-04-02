import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent = () => {
  const imageUrls = [
    'https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg',
    'https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg',
    'https://vcdn-sohoa.vnecdn.net/2019/04/05/kha-banh-6419-1554224971-6279-1554474750.jpg',
    'https://vcdn-sohoa.vnecdn.net/2019/04/05/kha-banh-6419-1554224971-6279-1554474750.jpg',
    'https://vcdn-sohoa.vnecdn.net/2019/04/05/kha-banh-6419-1554224971-6279-1554474750.jpg',
    'https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg',
  ];

  const navigation = useNavigation();

  const handleImagePress = (imageUrl) => {
    // Điều hướng tới trang mới và chuyển thông tin về hình ảnh
    navigation.navigate('ServiceDetailScreen', { imageUrl });
  };

  return (
    <View style={styles.header}>
      {/* Phần scroll chuyển ảnh */}
      <Text style={styles.dichvu}>Dịch Vụ</Text>
      <ScrollView horizontal={true} style={styles.scrollContainer}>
        {/* Các ô vuông */}
        {imageUrls.map((imageUrl, index) => (
          <TouchableOpacity key={index} style={styles.square} onPress={() => handleImagePress(imageUrl)}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  scrollContainer: {
    marginTop: 10,
  },
  square: {
    width: 100,
    height: 100,
    marginHorizontal: 10, // Khoảng cách giữa các ô vuông
    borderRadius: 10, // Bo tròn các góc
    overflow: 'hidden', // Ẩn phần ngoài vùng chứa hình ảnh
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Hiển thị hình ảnh theo tỷ lệ khung hình của ô vuông
  },
  dichvu: {
    textAlign: 'left',
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
});

export default HeaderComponent;
