import React, { useEffect, useState, useContext, useMemo } from 'react';
import {
  View, TextInput, Alert, FlatList, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button, Text, Card, Title, Checkbox,
  ActivityIndicator, Menu, IconButton
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// export default function FeedbackScreen() {
//   const { accessToken, user, BASE_URL } = useContext(AuthContext);
//   const [content, setContent] = useState('');
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const isAdmin = user?.is_staff;

//   const [menuVisible, setMenuVisible] = useState(false);
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchFeedbacks = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/feedbacks/`, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       setFeedbacks(res.data);
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Lỗi', 'Không thể tải phản ánh');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAdmin) fetchFeedbacks();
//   }, [isAdmin]);

//   const filtered = useMemo(() => {
//     return feedbacks.filter(item => {
//       if (filter === 'handled' && !item.handled) return false;
//       if (filter === 'pending' && item.handled) return false;
//       if (searchTerm && !item.content.toLowerCase().includes(searchTerm.toLowerCase()))
//         return false;
//       return true;
//     });
//   }, [feedbacks, filter, searchTerm]);

//   const toggleHandled = async (id, current) => {
//     try {
//       await axios.patch(`${BASE_URL}/feedbacks/${id}/`, { handled: !current }, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       fetchFeedbacks();
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Lỗi', 'Không thể cập nhật');
//     }
//   };

//   const submitFeedback = async () => {
//     if (!content.trim()) return Alert.alert('Lỗi', 'Nội dung không được để trống');
//     try {
//       await axios.post(`${BASE_URL}/feedbacks/`, { content }, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       Alert.alert('Thành công', 'Gửi phản ánh thành công');
//       setContent('');
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Lỗi', 'Không thể gửi');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={styles.header}>
//         <Title>{isAdmin ? 'Quản lý phản ánh' : 'Gửi phản ánh'}</Title>
//       </View>

//       {isAdmin ? (
//         <>
//           {/* Bộ lọc & tìm kiếm */}
//           <View style={styles.row}>
//             <View style={styles.menuWrapper}>
//               <Menu
//                 visible={menuVisible}
//                 onDismiss={() => setMenuVisible(false)}
//                 anchor={
//                   <Button
//                     mode="outlined"
//                     onPress={() => setMenuVisible(true)}>
//                     {filter === 'all' ? 'Tất cả' :
//                      filter === 'pending' ? 'Chưa xử lý' : 'Đã xử lý'}
//                   </Button>
//                 }>
//                 <Menu.Item onPress={() => { setFilter('all'); setMenuVisible(false); }} title="Tất cả" />
//                 <Menu.Item onPress={() => { setFilter('pending'); setMenuVisible(false); }} title="Chưa xử lý" />
//                 <Menu.Item onPress={() => { setFilter('handled'); setMenuVisible(false); }} title="Đã xử lý" />
//               </Menu>
//             </View>
//             <View style={styles.searchWrapper}>
//               <TextInput
//                 placeholder="Tìm kiếm..."
//                 style={styles.input}
//                 value={searchTerm}
//                 onChangeText={setSearchTerm}
//               />
//               {searchTerm !== '' && (
//                 <IconButton icon="close" size={20} onPress={() => setSearchTerm('')} />
//               )}
//             </View>
//           </View>

//           {loading ? (
//             <ActivityIndicator style={{ marginTop: 30 }} />
//           ) : (
//             <FlatList
//               data={filtered}
//               keyExtractor={item => item.id.toString()}
//               renderItem={({ item }) => (
//                 <Card style={styles.card}>
//                   <Card.Content>
//                     <Text style={{ marginBottom: 6 }}>{item.content}</Text>
//                     <Text variant="labelSmall">
//                       {new Date(item.created_at).toLocaleString()}
//                     </Text>

//                     <View style={styles.row}>
//                       <Text style={{
//                         marginTop: 6,
//                         marginRight: 12,
//                         color: item.handled ? 'green' : 'red',
//                         fontWeight: 'bold'
//                       }}>
//                         {item.handled ? 'Đã xử lý' : 'Chưa xử lý'}
//                       </Text>

//                       {!item.handled && (
//                         <Button
//                           icon="check"
//                           mode="outlined"
//                           onPress={() => toggleHandled(item.id, item.handled)}
//                         >
//                           Xác nhận đã xử lý
//                         </Button>
//                       )}
//                     </View>
//                   </Card.Content>
//                 </Card>
//               )}
//             />
//           )}
//         </>
//       ) : (
//         <>
//           <TextInput
//             placeholder="Nội dung..."
//             multiline
//             numberOfLines={6}
//             value={content}
//             onChangeText={setContent}
//             style={styles.textArea}
//           />
//           <Button mode="contained" onPress={submitFeedback}>
//             Gửi phản ánh
//           </Button>
//         </>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   root: { flex: 1, padding: 16 },
//   header: { marginBottom: 12 },
//   row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
//   menuWrapper: { marginRight: 8 },
//   searchWrapper: {
//     flex: 1, flexDirection: 'row',
//     alignItems: 'center', borderWidth: 1,
//     borderColor: '#ccc', borderRadius: 6,
//     paddingHorizontal: 8,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//   },
//   textArea: {
//     borderWidth: 1, borderColor: '#ccc',
//     borderRadius: 6, padding: 10,
//     textAlignVertical: 'top', height: 150,
//     marginBottom: 12
//   },
//   card: { marginBottom: 10 },
// });


















export default function FeedbackScreen() { 
  // Định nghĩa component FeedbackScreen, màn hình để gửi và quản lý phản ánh.

  const { accessToken, user, BASE_URL } = useContext(AuthContext);
  // Lấy thông tin từ AuthContext: accessToken để xác thực yêu cầu, user để kiểm tra quyền và BASE_URL cho API.

  const [content, setContent] = useState('');
  // State để lưu trữ nội dung của phản ánh người dùng nhập vào.

  const [feedbacks, setFeedbacks] = useState([]);
  // State để lưu trữ danh sách các phản ánh.

  const [loading, setLoading] = useState(false);
  // State để quản lý trạng thái tải dữ liệu (loading).

  const isAdmin = user?.is_staff;
  // Kiểm tra xem người dùng có phải là admin không (quyền xem và xử lý phản ánh).

  const [menuVisible, setMenuVisible] = useState(false);
  // State để quản lý hiển thị menu lọc các phản ánh (chưa xử lý hoặc đã xử lý).

  const [filter, setFilter] = useState('all');
  // State để lưu trữ lựa chọn bộ lọc phản ánh (tất cả, đã xử lý, chưa xử lý).

  const [searchTerm, setSearchTerm] = useState('');
  // State để lưu trữ từ khóa tìm kiếm của người dùng.

  // Hàm fetchFeedbacks: Gọi API để tải danh sách phản ánh từ server.
  const fetchFeedbacks = async () => {
    setLoading(true); 
    // Đặt loading = true khi bắt đầu tải dữ liệu.
    
    try {
      const res = await axios.get(`${BASE_URL}/feedbacks/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
        // Gửi yêu cầu GET đến API để lấy phản ánh, kèm theo accessToken để xác thực.
      });
      setFeedbacks(res.data);
      // Cập nhật state feedbacks với dữ liệu phản ánh nhận được từ API.
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể tải phản ánh');
      // Nếu có lỗi, hiển thị thông báo lỗi.
    } finally {
      setLoading(false);
      // Đặt loading = false sau khi tải xong dữ liệu.
    }
  };

  // useEffect sẽ gọi fetchFeedbacks khi người dùng có quyền admin (isAdmin).
  useEffect(() => {
    if (isAdmin) fetchFeedbacks();
  }, [isAdmin]);
  // useEffect chỉ chạy lại khi isAdmin thay đổi.

  // Hàm filtered sử dụng useMemo để lọc danh sách phản ánh theo điều kiện tìm kiếm và bộ lọc.
  const filtered = useMemo(() => {
    return feedbacks.filter(item => {
      if (filter === 'handled' && !item.handled) return false;
      // Nếu bộ lọc là 'handled' và phản ánh chưa được xử lý, thì không hiển thị.

      if (filter === 'pending' && item.handled) return false;
      // Nếu bộ lọc là 'pending' và phản ánh đã được xử lý, thì không hiển thị.

      if (searchTerm && !item.content.toLowerCase().includes(searchTerm.toLowerCase()))
        return false;
      // Nếu có từ khóa tìm kiếm và nội dung phản ánh không chứa từ khóa, thì không hiển thị.

      return true; 
      // Nếu tất cả các điều kiện trên không trả về false, thì phản ánh sẽ được hiển thị.
    });
  }, [feedbacks, filter, searchTerm]);
  // Lọc danh sách feedbacks khi feedbacks, filter, hoặc searchTerm thay đổi.

  // Hàm toggleHandled: Cập nhật trạng thái 'handled' của một phản ánh (đã xử lý/ chưa xử lý).
  const toggleHandled = async (id, current) => {
    try {
      await axios.patch(`${BASE_URL}/feedbacks/${id}/`, { handled: !current }, {
        headers: { Authorization: `Bearer ${accessToken}` }
        // Gửi yêu cầu PATCH để cập nhật trạng thái 'handled' của phản ánh.
      });
      fetchFeedbacks();
      // Tải lại danh sách phản ánh sau khi cập nhật thành công.
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể cập nhật');
      // Hiển thị thông báo lỗi nếu có vấn đề trong quá trình cập nhật.
    }
  };

  // Hàm submitFeedback: Gửi phản ánh mới từ người dùng lên server.
  const submitFeedback = async () => {
    if (!content.trim()) return Alert.alert('Lỗi', 'Nội dung không được để trống');
    // Kiểm tra xem người dùng đã nhập nội dung chưa, nếu trống sẽ không gửi và hiển thị thông báo lỗi.

    try {
      await axios.post(`${BASE_URL}/feedbacks/`, { content }, {
        headers: { Authorization: `Bearer ${accessToken}` }
        // Gửi yêu cầu POST để tạo mới phản ánh, kèm theo nội dung và token xác thực.
      });
      Alert.alert('Thành công', 'Gửi phản ánh thành công');
      // Hiển thị thông báo thành công khi phản ánh được gửi thành công.
      setContent('');
      // Reset lại nội dung form sau khi gửi thành công.
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể gửi');
      // Hiển thị thông báo lỗi nếu không thể gửi phản ánh.
    }
  };
    return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Title>{isAdmin ? 'Quản lý phản ánh' : 'Gửi phản ánh'}</Title>
      </View>

      {isAdmin ? (
        <>
          {/* Bộ lọc & tìm kiếm */}
          <View style={styles.row}>
            <View style={styles.menuWrapper}>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setMenuVisible(true)}>
                    {filter === 'all' ? 'Tất cả' :
                     filter === 'pending' ? 'Chưa xử lý' : 'Đã xử lý'}
                  </Button>
                }>
                <Menu.Item onPress={() => { setFilter('all'); setMenuVisible(false); }} title="Tất cả" />
                <Menu.Item onPress={() => { setFilter('pending'); setMenuVisible(false); }} title="Chưa xử lý" />
                <Menu.Item onPress={() => { setFilter('handled'); setMenuVisible(false); }} title="Đã xử lý" />
              </Menu>
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                placeholder="Tìm kiếm..."
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              {searchTerm !== '' && (
                <IconButton icon="close" size={20} onPress={() => setSearchTerm('')} />
              )}
            </View>
          </View>

          {loading ? (
            <ActivityIndicator style={{ marginTop: 30 }} />
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card.Content>
                    <Text style={{ marginBottom: 6 }}>{item.content}</Text>
                    <Text variant="labelSmall">
                      {new Date(item.created_at).toLocaleString()}
                    </Text>

                    <View style={styles.row}>
                      <Text style={{
                        marginTop: 6,
                        marginRight: 12,
                        color: item.handled ? 'green' : 'red',
                        fontWeight: 'bold'
                      }}>
                        {item.handled ? 'Đã xử lý' : 'Chưa xử lý'}
                      </Text>

                      {!item.handled && (
                        <Button
                          icon="check"
                          mode="outlined"
                          onPress={() => toggleHandled(item.id, item.handled)}
                        >
                          Xác nhận đã xử lý
                        </Button>
                      )}
                    </View>
                  </Card.Content>
                </Card>
              )}
            />
          )}
        </>
      ) : (
        <>
          <TextInput
            placeholder="Nội dung..."
            multiline
            numberOfLines={6}
            value={content}
            onChangeText={setContent}
            style={styles.textArea}
          />
          <Button mode="contained" onPress={submitFeedback}>
            Gửi phản ánh
          </Button>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  header: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  menuWrapper: { marginRight: 8 },
  searchWrapper: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center', borderWidth: 1,
    borderColor: '#ccc', borderRadius: 6,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  textArea: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 6, padding: 10,
    textAlignVertical: 'top', height: 150,
    marginBottom: 12
  },
  card: { marginBottom: 10 },
});