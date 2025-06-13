import React, { useEffect, useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api'; 

export default function TransferScreen() {
  const { user } = useContext(AuthContext);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      fetchResidents();
    }
  }, []);

  const fetchResidents = async () => {
    try {
      const res = await api.get('/users/list-all/');
      const data = Array.isArray(res.data) ? res.data : [];
      const residentList = data.filter(u => u.role === 'resident' && u.is_active);
      setResidents(residentList);
    } catch (err) {
      console.error('Lỗi khi tải danh sách cư dân:', err);
      Alert.alert('Lỗi', 'Không thể tải danh sách cư dân.');
    } finally {
      setLoading(false);
    }
  };

  const confirmTransfer = (resident) => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn chuyển nhượng nhà và khóa tài khoản của cư dân ${resident.first_name} ${resident.last_name}?`,
      [
        { text: 'Hủy' },
        { text: 'Đồng ý', onPress: () => handleTransfer(resident.id) },
      ]
    );
  };

  const handleTransfer = async (userId) => {
    try {
      await api.patch(`/users/${userId}/transfer_house/`);
      Alert.alert('Thành công', 'Tài khoản đã được khóa do chuyển nhượng.');
      fetchResidents(); // reload danh sách
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể chuyển nhượng tài khoản.');
      console.error(err);
    }
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <Text variant="titleMedium" style={styles.errorText}>
          Chức năng này chỉ dành cho quản trị viên.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Chuyển nhượng nhà / Khóa tài khoản</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={residents}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={`${item.first_name} ${item.last_name}`}
                subtitle={`SĐT: ${item.phone || '(chưa cập nhật)'}`}
                left={() =>
                  item.avatar ? (
                    <Avatar.Image size={40} source={{ uri: item.avatar }} />
                  ) : (
                    <Avatar.Text size={40} label="?" />
                  )
                }
              />
              <Card.Content>
                <Text>Địa chỉ: {item.address || '(chưa cập nhật)'}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => confirmTransfer(item)}>Chuyển nhượng</Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 8,
    borderRadius: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
