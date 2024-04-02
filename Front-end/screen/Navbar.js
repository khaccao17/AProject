import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'; // Import Icon từ react-native-elements

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      {/* Phần hiển thị logo ở góc trái */}
      <View style={styles.logoContainer}>
        {/* Thay thế 'YourLogo' bằng hình ảnh logo của bạn */}
        <Text style={styles.logoText}>YourLogo</Text>
      </View>
      {/* Phần hiển thị 'Home' ở giữa */}
      <Text style={styles.navItem}>Home</Text>
      {/* Phần hiển thị các lựa chọn icon ở góc phải */}
      <View style={styles.iconContainer}>
        <Icon name="options" type="ionicon" size={24} color="black" />
        <Icon name="notifications" type="ionicon" size={24} color="black" />
        <Icon name="settings" type="ionicon" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navItem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Navbar;
