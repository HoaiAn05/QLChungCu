import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function PaymentListScreen() {
  const { accessToken, BASE_URL } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/payments/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">Loại phí: {item.fee_type}</Text>
        <Text>Số tiền: {item.amount} đ</Text>
        <Text>Phương thức: {item.method}</Text>
        <Text>Ngày thanh toán: {item.timestamp?.substring(0, 10)}</Text>
        <Text>Trạng thái: {item.confirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Danh sách Thanh toán</Text>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 12, textAlign: 'center' },
  card: {
    marginBottom: 12,
    backgroundColor: '#f4f4f4',
  },
});
