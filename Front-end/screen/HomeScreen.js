import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const HomeScreen = () => {
  // Danh sách các mục trong navbar
  const navbarItems = ['Trang chủ', 'Tin tức', 'Sự kiện', 'Hướng dẫn', 'Liên hệ'];

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {/* Render các mục navbar từ mảng */}
        {navbarItems.map((item, index) => (
          <Text key={index} style={styles.navbarItem}>{item}</Text>
        ))}
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Nội dung */}
        <View style={styles.content}>
          <Text style={styles.textContent}>Đây là nội dung của trang chủ.</Text>
          {/* Thêm ảnh */}
          <Image
            style={styles.image}
            source={{ uri: 'https://thanhnien.mediacdn.vn/Uploaded/linhnt-qc/2022_01_10/mh-1-4707.jpg' }}
          />
          {/* Thêm nội dung khác ở đây */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row', // Sắp xếp các mục theo chiều ngang
    height: 60,
    backgroundColor: '#007bff',
    justifyContent: 'space-around', // Căn các mục navbar đều nhau
    alignItems: 'center',
  },
  navbarItem: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 10,
  },
  content: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  textContent: {
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default HomeScreen;
