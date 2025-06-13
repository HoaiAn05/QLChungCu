import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, Image, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, accessToken, BASE_URL, fetchUser } = useContext(AuthContext);

  const [avatarUri, setAvatarUri] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [password, setPassword] = useState('');

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const picked = result.assets[0];
      setAvatarFile(picked);
      setAvatarUri(picked.uri);
    }
  };

  const updateProfile = async () => {
    const form = new FormData();
    form.append('first_name', firstName);
    form.append('last_name', lastName);
    form.append('phone', phone);
    form.append('address', address);
    if (password) form.append('password', password);
    if (avatarFile) {
      form.append('avatar', {
        uri: avatarFile.uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });
    }

    try {
      await axios.patch(`${BASE_URL}/users/current_user/`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
      fetchUser(accessToken);
      setPassword(''); // reset password field after update
    } catch (err) {
      console.log(err);
      Alert.alert('Lỗi', 'Không thể cập nhật');
    }
  };

  useEffect(() => {
    setAvatarUri(user?.avatar || null);
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setPhone(user?.phone || '');
    setAddress(user?.address || '');
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Title style={styles.title}>Cập nhật hồ sơ</Title>

        <View style={styles.avatarContainer}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <Text style={styles.noAvatarText}>Chưa cập nhật avatar</Text>
          )}
          <Button
            mode="outlined"
            onPress={pickAvatar}
            style={styles.pickAvatarButton}
          >
            Chọn ảnh đại diện
          </Button>
        </View>

        <TextInput
          label="Họ"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          mode="outlined"
          autoCapitalize="words"
        />
        <TextInput
          label="Tên"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          mode="outlined"
          autoCapitalize="words"
        />
        <TextInput
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
        />
        <TextInput
          label="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
          autoCapitalize="words"
        />
        <TextInput
          label="Mật khẩu mới"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />

        <Button mode="contained" onPress={updateProfile} style={styles.saveButton}>
          Lưu thay đổi
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#6200ee',
    marginBottom: 12,
  },
  noAvatarText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 12,
  },
  pickAvatarButton: {
    alignSelf: 'center',
  },
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
  },
});


