import React, { useState, useEffect, useContext } from 'react';
//useState: Dùng để lưu trữ trạng thái trong component.
// useEffect: Dùng để thực hiện các hành động khi component được render hoặc khi các giá trị phụ thuộc thay đổi.
// useContext: Dùng để truy cập vào dữ liệu trong context (trong trường hợp này là AuthContext).

import { SafeAreaView, StyleSheet, FlatList, View, TextInput, Button, Alert } from 'react-native';
import { Text, Card, Switch, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function RelativesScreen() {
  const { user, accessToken, BASE_URL } = useContext(AuthContext);

  const [fullName, setFullName] = useState('');
  const [relation, setRelation] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [relatives, setRelatives] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRelatives = async () => { // Hàm này gọi API để lấy danh sách người thân của người dùng.
    try {
      const res = await axios.get(`${BASE_URL}/relatives/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setRelatives(res.data); //Nếu thành công, cập nhật relatives bằng dữ liệu nhận được.

    } catch (err) {
      console.error('Lỗi fetch:', err);
      Alert.alert('Lỗi', 'Không thể tải danh sách người thân');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { //Khi user hoặc accessToken thay đổi, hàm fetchRelatives sẽ được gọi để tải lại danh sách người thân.
    if (user && accessToken) fetchRelatives();
  }, [user]);

  const handleRegister = async () => { //Hàm này xử lý yêu cầu đăng ký một người thân mới.
    if (!fullName || !relation) { //Kiểm tra nếu fullName và relation chưa được nhập, sẽ hiển thị thông báo lỗi.
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ họ tên và mối quan hệ');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/relatives/`, { //thực hiện yêu cầu POST tới API để tạo mới người thân.
        full_name: fullName,
        relation: relation,
        id_number: idNumber,  
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      //Sau khi thành công, làm trống các trường nhập liệu và tải lại danh sách người thân.
      Alert.alert('Thành công', 'Đã gửi yêu cầu đăng ký người thân');
      setFullName('');
      setRelation('');
      setIdNumber('');
      fetchRelatives();
    } catch (err) {
      console.error('Lỗi đăng ký:', err.response?.data || err.message);
      Alert.alert('Lỗi', 'Không thể đăng ký');
    }
  };

  const handleToggleApprove = async (id, approved) => { //Xử lý việc xác nhận người thân (dành cho quản trị viên).
  try {
    if (approved) {//Nếu approved là true, gửi yêu cầu PATCH để cập nhật trạng thái người thân thành "đã duyệt".
      
      await axios.patch(`${BASE_URL}/relatives/${id}/approve/`, {approved: true}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    } else {
   
      Alert.alert('Không hỗ trợ', 'Không thể hủy xác nhận đã duyệt');
      return;
    }
    fetchRelatives();
  } catch (err) {
    console.error('Lỗi xác nhận:', err);
    Alert.alert('Lỗi', 'Không thể cập nhật xác nhận');
  }
};


  const renderItem = ({ item }) => ( //Hàm này hiển thị thông tin chi tiết của mỗi người thân trong danh sách.
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.full_name}</Text>
        <Text>Mối quan hệ: {item.relation}</Text>
        <Text>Biển số xe: {item.id_number}</Text>
        <Text>Ngày tạo: {item.created_at?.substring(0, 10)}</Text>
        {user?.role === 'admin' ? ( //hiển thị Switch cho phép xác nhận hoặc từ chối người thân
          <View style={styles.switchRow}>
            <Text>Xác nhận:</Text>
            <Switch
              value={item.approved}
              onValueChange={(value) => handleToggleApprove(item.id, value)}
            />
          </View>
        ) : (
          <Text>Trạng thái: {item.approved ? 'Đã xác nhận' : 'Chờ xác nhận'}</Text>
        )}
      </Card.Content>
    </Card>
  );

  if (!user) { //Nếu user chưa có, hiển thị thông báo và ActivityIndicator (vòng quay chờ) cho đến khi thông tin người dùng được tải xong.
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator animating size="large" />
        <Text>Đang tải thông tin người dùng...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Người thân</Text>

      {user?.role !== 'admin' && (
        <View style={styles.form}>
          <TextInput
            placeholder="Họ và tên"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            placeholder="Mối quan hệ"
            style={styles.input}
            value={relation}
            onChangeText={setRelation}
          />
          <TextInput
            placeholder="Biển số xe"
            style={styles.input}
            value={idNumber}
            onChangeText={setIdNumber}
          />
          <Button title="Đăng ký người thân" onPress={handleRegister} />
        </View>
      )}

      {loading ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <FlatList
          data={relatives}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 12 },
  form: { marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    marginBottom: 10, paddingHorizontal: 10, height: 40
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  }
});




