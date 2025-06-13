import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text, Card, ActivityIndicator, TextInput, RadioButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function PaymentScreen({ navigation }) {
  const { accessToken, BASE_URL } = useContext(AuthContext);

  const [feeType, setFeeType] = useState('management');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('momo_upload');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadReceipt = async () => {
    if (!image) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh minh chứng.');
      return;
    }
    if (!amount || isNaN(amount)) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ.');
      return;
    }

    const form = new FormData();
    form.append('receipt_image', {
      uri: image.uri,
      name: 'receipt.jpg',
      type: 'image/jpeg',
    });
    form.append('fee_type', feeType);
    form.append('amount', amount);
    form.append('method', method);

    setUploading(true);
    try {
      await axios.post(`${BASE_URL}/payments/`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Thành công', 'Đã gửi minh chứng thanh toán');
      setImage(null);
      setAmount('');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        Alert.alert('Lỗi', JSON.stringify(err.response.data));
      } else {
        Alert.alert('Lỗi', 'Không thể gửi minh chứng');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text variant="headlineMedium" style={styles.title}>Nộp Uỷ Nhiệm Chi</Text>

        <Text style={styles.label}>Loại phí</Text>
        <RadioButton.Group onValueChange={value => setFeeType(value)} value={feeType}>
          <View style={styles.radioRow}>
            <RadioButton value="management" />
            <Text style={styles.radioLabel}>Phí quản lý</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton value="parking" />
            <Text style={styles.radioLabel}>Phí gửi xe</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton value="other" />
            <Text style={styles.radioLabel}>Dịch vụ khác</Text>
          </View>
        </RadioButton.Group>

        <TextInput
          label="Số tiền (VNĐ)"
          value={amount}
          onChangeText={text => setAmount(text)}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />

        <Text style={styles.label}>Phương thức thanh toán</Text>
        <RadioButton.Group onValueChange={value => setMethod(value)} value={method}>
          <View style={styles.radioRow}>
            <RadioButton value="momo_upload" />
            <Text style={styles.radioLabel}>Momo chuyển khoản</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton value="momo_gateway" />
            <Text style={styles.radioLabel}>Momo Gateway</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton value="vnpay" />
            <Text style={styles.radioLabel}>VNPAY</Text>
          </View>
        </RadioButton.Group>

        <Button mode="contained" onPress={pickImage} style={styles.button}>
          Chọn ảnh minh chứng
        </Button>

        {image && (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: image.uri }} />
          </Card>
        )}

        {uploading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : (
          <>
            <Button
              mode="contained"
              onPress={uploadReceipt}
              style={styles.button}
              disabled={!image || !amount}
            >
              Gửi minh chứng
            </Button>
            <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
              Quay lại
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('InvoiceListScreen')}
              style={styles.button}
            >
              Xem hóa đơn
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 16, textAlign: 'center' },
  label: { marginTop: 16, fontWeight: 'bold' },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  radioLabel: { fontSize: 16 },
  input: { marginTop: 8 },
  button: { marginVertical: 12 },
  card: { marginVertical: 16 },
});



