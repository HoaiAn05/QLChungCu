import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import api from '../utils/api'; // sử dụng API có interceptor token
import { useNavigation } from '@react-navigation/native';

// export default function CreateResidentScreen() {
//   const navigation = useNavigation();
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//     email: '',
//     first_name: '',
//     last_name: '',
//     phone: '',
//   });

//   const handleInputChange = (field, value) => {
//     setForm(prevForm => ({
//       ...prevForm,
//       [field]: value,
//     }));
//   };

//   const validateForm = () => {
//     const { username, password, first_name, last_name } = form;
//     if (!username || !password || !first_name || !last_name) {
//       Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ các trường bắt buộc.');
//       return false;
//     }
//     return true;
//   };

//   const handleCreate = async () => {
//     if (!validateForm()) return;

//     try {
//       const payload = {
//         ...form,
//         role: 'resident',
//         is_active: true,
//       };

//       const response = await api.post('/users/', payload);

//       Alert.alert('Thành công', 'Tài khoản cư dân đã được tạo.');
//       navigation.goBack();
//     } catch (error) {
//       if (error.message === 'Network Error') {
//         Alert.alert('Lỗi mạng', 'Không thể kết nối đến máy chủ.');
//       } else {
//         const message = error.response?.data?.detail || 'Lỗi không xác định';
//         Alert.alert('Lỗi tạo tài khoản', message);
//       }
//       console.log('Chi tiết lỗi:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Title style={styles.title}>Tạo tài khoản cư dân</Title>

//       <TextInput
//         label="Tên đăng nhập *"
//         value={form.username}
//         onChangeText={text => handleInputChange('username', text)}
//         style={styles.input}
//       />
//       <TextInput
//         label="Mật khẩu *"
//         value={form.password}
//         onChangeText={text => handleInputChange('password', text)}
//         secureTextEntry
//         style={styles.input}
//       />
//       <TextInput
//         label="Email"
//         value={form.email}
//         onChangeText={text => handleInputChange('email', text)}
//         keyboardType="email-address"
//         style={styles.input}
//       />
//       <TextInput
//         label="Họ *"
//         value={form.first_name}
//         onChangeText={text => handleInputChange('first_name', text)}
//         style={styles.input}
//       />
//       <TextInput
//         label="Tên *"
//         value={form.last_name}
//         onChangeText={text => handleInputChange('last_name', text)}
//         style={styles.input}
//       />
//       <TextInput
//         label="Số điện thoại"
//         value={form.phone}
//         onChangeText={text => handleInputChange('phone', text)}
//         keyboardType="phone-pad"
//         style={styles.input}
//       />

//       <Button mode="contained" onPress={handleCreate} style={styles.button}>
//         Tạo tài khoản
//       </Button>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 24,
//     fontSize: 22,
//   },
//   input: {
//     marginBottom: 12,
//   },
//   button: {
//     marginTop: 20,
//   },
// });















export default function CreateResidentScreen() { 
  
  const navigation = useNavigation();
  // Lấy đối tượng navigation từ hook useNavigation, cho phép điều hướng giữa các màn hình trong ứng dụng.
  
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
  });
  // Khởi tạo state 'form' để lưu trữ dữ liệu người dùng nhập vào (username, password, email, v.v.).
  
  const handleInputChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };
  // Hàm này xử lý khi người dùng nhập vào một trường dữ liệu.
  // 'field' là tên trường (ví dụ: username), 'value' là giá trị nhập vào, 
  // cập nhật state 'form' với giá trị mới cho trường tương ứng.
  
  const validateForm = () => {
    const { username, password, first_name, last_name } = form;
    if (!username || !password || !first_name || !last_name) {
      // Kiểm tra xem các trường bắt buộc đã được nhập đầy đủ chưa.
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ các trường bắt buộc.');
      return false;  // Nếu thiếu trường bắt buộc, trả về false.
    }
    return true;  // Nếu tất cả các trường bắt buộc đều có giá trị, trả về true.
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    // Kiểm tra tính hợp lệ của form. Nếu form không hợp lệ, dừng lại và không thực hiện tạo tài khoản.

    try {
      const payload = {
        ...form,
        role: 'resident',
        is_active: true,
      };
      // Tạo đối tượng payload chứa thông tin người dùng, bao gồm role và trạng thái hoạt động.

      const response = await api.post('/users/', payload);
      // Gửi yêu cầu POST đến API để tạo tài khoản cư dân, sử dụng axios (api.post).

      Alert.alert('Thành công', 'Tài khoản cư dân đã được tạo.');
      // Hiển thị thông báo thành công nếu tài khoản được tạo thành công.
      navigation.goBack();
      // Quay lại màn hình trước đó sau khi tạo tài khoản thành công.
    } catch (error) {
      // Bắt lỗi nếu có sự cố trong quá trình gửi yêu cầu.
      if (error.message === 'Network Error') {
        Alert.alert('Lỗi mạng', 'Không thể kết nối đến máy chủ.');
        // Nếu lỗi là do kết nối mạng, hiển thị thông báo lỗi mạng.
      } else {
        const message = error.response?.data?.detail || 'Lỗi không xác định';
        Alert.alert('Lỗi tạo tài khoản', message);
        // Nếu có lỗi khác từ server, hiển thị thông báo lỗi tạo tài khoản.
      }
      console.log('Chi tiết lỗi:', error.response?.data || error.message);
      // In chi tiết lỗi vào console để dễ dàng kiểm tra trong quá trình phát triển.
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Tạo tài khoản cư dân</Title>

      <TextInput
        label="Tên đăng nhập *"
        value={form.username}
        onChangeText={text => handleInputChange('username', text)}
        style={styles.input}
      />
      <TextInput
        label="Mật khẩu *"
        value={form.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Họ *"
        value={form.first_name}
        onChangeText={text => handleInputChange('first_name', text)}
        style={styles.input}
      />
      <TextInput
        label="Tên *"
        value={form.last_name}
        onChangeText={text => handleInputChange('last_name', text)}
        style={styles.input}
      />
      <TextInput
        label="Số điện thoại"
        value={form.phone}
        onChangeText={text => handleInputChange('phone', text)}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleCreate} style={styles.button}>
        Tạo tài khoản
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 22,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
});