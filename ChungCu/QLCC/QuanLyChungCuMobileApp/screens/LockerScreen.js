
// import React, { useContext, useEffect, useState, useMemo } from 'react';
// import {
//   View,
//   Alert,
//   FlatList,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { Text, TextInput, Button, List } from 'react-native-paper';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// export default function LockerScreen() {
//   const { accessToken, BASE_URL, user } = useContext(AuthContext);
//   const [items, setItems] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [entries, setEntries] = useState([{ user_id: '', user_name: '', item_name: '' }]);



//   const fetchLockerItems = async () => { 
//     try {
//       const res = await axios.get(`${BASE_URL}/locker-items/`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       setItems(res.data); 
//     } catch (err) {
//       console.warn('Fetch locker error:', err?.response?.data || err.message);
//       Alert.alert('Lỗi', 'Không thể tải danh sách tủ đồ');
//     }
//   };

//   const fetchUsers = async () => { 
//     if (!user?.is_staff) return; 
//     try {
//       const res = await axios.get(`${BASE_URL}/users/listuser/?role=resident`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.warn('Fetch users error:', err?.response?.data || err.message);
//       Alert.alert('Lỗi', 'Không thể tải danh sách cư dân');
//     }
//   };

//   const updateEntry = (index, key, value) => { 
//     setEntries(prev => {
//       const updated = [...prev];
     
//       updated[index] = { ...updated[index], [key]: value };
//       return updated;
//     });
//   };

//   const addEntryRow = () => { 
//     setEntries(prev => [...prev, { user_id: '', user_name: '', item_name: '' }]);
//   };

//   const submitEntries = async () => { 
//   const validEntries = entries.filter(e =>
//     e.user_id && typeof e.user_id === 'number' && e.item_name?.trim().length > 0
//   );


//   if (!validEntries.length) {
//     Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
//     return;
//   }

//   try {
   
//     for (const entry of validEntries) {
//       const payload = {
//         item_name: entry.item_name.trim(), 
//         user: entry.user_id,                
//         sender: user?.full_name || '',      
//       };
//       console.log('Sending entry:', payload);

      
//       await axios.post(`${BASE_URL}/locker-items/`, payload, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//     }

   
//     Alert.alert('Thành công', 'Đã thêm các mục vào locker');
//     fetchLockerItems();  
//     setEntries([{ user_id: '', user_name: '', item_name: '' }]);  
//   } catch (err) {
//     console.warn('Submit error:', JSON.stringify(err?.response?.data, null, 2));
//     Alert.alert('Lỗi', 'Không thể thêm hàng');
//   }
// };


//   const markReceived = async (id) => { 
//     Alert.alert('Xác nhận', 'Bạn có chắc cư dân đã nhận món hàng này?', [
//       { text: 'Huỷ', style: 'cancel' },
//       {
//         text: 'Xác nhận',
//         onPress: async () => {
//           try {
//             await axios.patch(`${BASE_URL}/locker-items/${id}/mark_received/`, {}, {
//               headers: { Authorization: `Bearer ${accessToken}` },
//             });
//             fetchLockerItems();
//           } catch (err) {
//             console.warn('Mark received error:', err?.response?.data || err.message);
//             Alert.alert('Lỗi', 'Không thể xác nhận');
//           }
//         },
//       },
//     ]);
//   };

//   useEffect(() => {
//     fetchLockerItems();
//     fetchUsers();
//   }, []);

//   const renderEntry = ({ item, index }) => {
//     const suggestions = users.filter(u =>
//       `${u.first_name} ${u.last_name}`.toLowerCase().includes(item.user_name.toLowerCase())
//     );

//     return (
//       <View style={{ marginBottom: 16 }}>
//         <TextInput
//           label="Tên gói hàng"
//           value={item.item_name}
//           onChangeText={(text) => updateEntry(index, 'item_name', text)}
//           style={{ marginBottom: 8 }}
//         />
//         {user?.is_staff && (
//           <>
//             <TextInput
//               label="Tìm cư dân"
//               value={item.user_name}
//               onChangeText={(text) => {
//                 updateEntry(index, 'user_name', text);
//                 const matched = users.find(u =>
//                   `${u.first_name} ${u.last_name}`.toLowerCase() === text.toLowerCase()
//                 );
//                 updateEntry(index, 'user_id', matched ? matched.id : '');
//               }}
//               style={{ marginBottom: 4 }}
//             />
//             {item.user_name.length > 0 && suggestions.length > 0 && (
//               <FlatList
//                 data={suggestions}
//                 keyExtractor={(u) => `sug-${u.id}`}
//                 renderItem={({ item: u }) => (
//                   <TouchableOpacity
//                     onPress={() => {
//                       updateEntry(index, 'user_name', `${u.first_name} ${u.last_name}`);
//                       updateEntry(index, 'user_id', u.id);
//                     }}
//                   >
//                     <List.Item title={`${u.first_name} ${u.last_name}`} description={`ID: ${u.id}`} />
//                   </TouchableOpacity>
//                 )}
//                 style={{ maxHeight: 100 }}
//               />
//             )}
//           </>
//         )}
//       </View>
//     );
//   };

//   const headerComponent = useMemo(() => (
//     <View style={{ padding: 20 }}>
//       <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 12 }}>📦 Tủ đồ</Text>
//       {user?.is_staff && (
//         <>
//           <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Gửi hàng cho cư dân:</Text>
//           <FlatList
//             data={entries}
//             keyExtractor={(_, index) => `entry-${index}`}
//             renderItem={renderEntry}
//             scrollEnabled={false}
//           />
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
//             <Button mode="outlined" onPress={addEntryRow} icon="plus">Thêm dòng</Button>
//             <Button mode="contained" onPress={submitEntries} icon="send">Gửi hàng</Button>
//           </View>
//           <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 20 }} />
//         </>
//       )}
//       <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Danh sách gói hàng:</Text>
//     </View>
//   ), [entries, users]);

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <FlatList
//         data={items}
//         keyExtractor={(item) => `locker-${item.id}`}
//         ListHeaderComponent={headerComponent}
//         contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
//         renderItem={({ item }) => (
//           <View style={{
//             borderWidth: 1,
//             borderColor: '#ccc',
//             padding: 12,
//             borderRadius: 8,
//             marginTop: 10,
//             backgroundColor: '#f9f9f9',
//           }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16 }}>📦 {item.item_name}</Text>
//             <Text style={{ marginTop: 4 }}>
//               👤 Cư dân: <Text style={{ fontWeight: '600' }}>{item.user_full_name || 'Ẩn danh'}</Text>
//             </Text>
//             <Text>📅 Trạng thái: {item.status === 'received' ? '✅ Đã nhận' : '📥 Chưa nhận'}</Text>
//             {user?.is_staff && item.status !== 'received' && (
//               <Button onPress={() => markReceived(item.id)} style={{ marginTop: 8 }}>✅ Xác nhận đã nhận</Button>
//             )}
//           </View>
//         )}
//         ListEmptyComponent={() => (
//           <Text style={{ textAlign: 'center', marginTop: 40, fontStyle: 'italic' }}>
//             Hiện không có gói hàng nào.
//           </Text>
//         )}
//       />
//     </KeyboardAvoidingView>
//   );
// }

































import React, { useContext, useEffect, useState, useMemo } from 'react'; 
// Import các hook cần thiết từ React: useContext, useEffect, useState, useMemo.
import { View, Alert, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'; 
// Import các component từ React Native như View, Alert, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform.
import { Text, TextInput, Button, List } from 'react-native-paper'; 
// Import các component UI từ thư viện react-native-paper như Text, TextInput, Button, List.
import axios from 'axios'; 
// Import axios để thực hiện các yêu cầu HTTP.
import { AuthContext } from '../context/AuthContext'; 
// Import AuthContext để lấy thông tin người dùng và token từ context.

export default function LockerScreen() {  // Định nghĩa component LockerScreen
  const { accessToken, BASE_URL, user } = useContext(AuthContext);  // Lấy thông tin accessToken, BASE_URL và user từ AuthContext.
  
  const [items, setItems] = useState([]);  // State lưu trữ danh sách các mục trong tủ đồ.
  
  const [users, setUsers] = useState([]);  // State lưu trữ danh sách cư dân (dành cho admin).
  
  const [entries, setEntries] = useState([{ user_id: '', user_name: '', item_name: '' }]); 
  // State lưu trữ các mục mà người dùng muốn gửi cho cư dân. Mỗi mục có user_id, user_name và item_name.

  // Hàm fetchLockerItems gọi API để lấy danh sách các mục trong tủ đồ.
  const fetchLockerItems = async () => { 
    try {
      const res = await axios.get(`${BASE_URL}/locker-items/`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Gửi token xác thực.
      });
      setItems(res.data); // Cập nhật state items với dữ liệu trả về.
    } catch (err) {
      console.warn('Fetch locker error:', err?.response?.data || err.message);
      Alert.alert('Lỗi', 'Không thể tải danh sách tủ đồ'); 
      // Nếu có lỗi, hiển thị thông báo lỗi.
    }
  };

  // Hàm fetchUsers chỉ gọi API để lấy danh sách cư dân nếu người dùng là admin.
  const fetchUsers = async () => { 
    if (!user?.is_staff) return; 
    // Kiểm tra nếu không phải admin, thì không gọi API.
    try {
      const res = await axios.get(`${BASE_URL}/users/listuser/?role=resident`, {
        headers: { Authorization: `Bearer ${accessToken}` }, 
      });
      setUsers(res.data); 
      // Cập nhật state users với danh sách cư dân.
    } catch (err) {
      console.warn('Fetch users error:', err?.response?.data || err.message);
      Alert.alert('Lỗi', 'Không thể tải danh sách cư dân');
    }
  };

  // Hàm updateEntry cập nhật các mục trong entries khi người dùng thay đổi thông tin.
  const updateEntry = (index, key, value) => { 
    setEntries(prev => { 
      const updated = [...prev]; 
      updated[index] = { ...updated[index], [key]: value }; // Cập nhật mục tại index.
      return updated; // Trả về state mới.
    });
  };

  // Hàm addEntryRow thêm một dòng mới vào entries.
  const addEntryRow = () => { 
    setEntries(prev => [...prev, { user_id: '', user_name: '', item_name: '' }]); 
    // Thêm một đối tượng rỗng vào entries.
  };

  // Hàm submitEntries gửi các mục trong entries lên server.
  const submitEntries = async () => { 
    // Lọc các mục hợp lệ.
    const validEntries = entries.filter(e =>
      e.user_id && typeof e.user_id === 'number' && e.item_name?.trim().length > 0
    );

    if (!validEntries.length) { 
      // Kiểm tra xem có mục hợp lệ không.
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin'); 
      return; // Nếu không có mục hợp lệ, dừng lại.
    }

    try {
      for (const entry of validEntries) {
        // Duyệt qua tất cả các mục hợp lệ.
        const payload = {
          item_name: entry.item_name.trim(), 
          user: entry.user_id, 
          sender: user?.full_name || '', 
        };
        console.log('Sending entry:', payload); // In payload ra để kiểm tra.

        await axios.post(`${BASE_URL}/locker-items/`, payload, {
          headers: { Authorization: `Bearer ${accessToken}` }, // Gửi token xác thực.
        });
      }

      Alert.alert('Thành công', 'Đã thêm các mục vào locker');
      fetchLockerItems(); // Tải lại danh sách tủ đồ.
      setEntries([{ user_id: '', user_name: '', item_name: '' }]); // Reset form nhập liệu.
    } catch (err) {
      console.warn('Submit error:', JSON.stringify(err?.response?.data, null, 2));
      Alert.alert('Lỗi', 'Không thể thêm hàng');
    }
  };

  // Hàm markReceived đánh dấu món hàng đã được nhận.
  const markReceived = async (id) => { 
    Alert.alert('Xác nhận', 'Bạn có chắc cư dân đã nhận món hàng này?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xác nhận',
        onPress: async () => { 
          try {
            await axios.patch(`${BASE_URL}/locker-items/${id}/mark_received/`, {}, {
              headers: { Authorization: `Bearer ${accessToken}` }, 
            });
            fetchLockerItems(); // Tải lại danh sách tủ đồ.
          } catch (err) {
            console.warn('Mark received error:', err?.response?.data || err.message);
            Alert.alert('Lỗi', 'Không thể xác nhận');
          }
        },
      },
    ]);
  };

  // Sử dụng useEffect để tải danh sách mục và danh sách cư dân khi component render lần đầu.
  useEffect(() => {
    fetchLockerItems(); 
    fetchUsers();
  }, []); 

  // Hàm renderEntry render mỗi dòng nhập liệu cho tủ đồ.
  const renderEntry = ({ item, index }) => {
    const suggestions = users.filter(u =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(item.user_name.toLowerCase())
    ); 

    return (
      <View style={{ marginBottom: 16 }}>
        <TextInput
          label="Tên gói hàng"
          value={item.item_name}
          onChangeText={(text) => updateEntry(index, 'item_name', text)}
          style={{ marginBottom: 8 }}
        />
        {user?.is_staff && (
          <>
            <TextInput
              label="Tìm cư dân"
              value={item.user_name}
              onChangeText={(text) => {
                updateEntry(index, 'user_name', text);
                const matched = users.find(u =>
                  `${u.first_name} ${u.last_name}`.toLowerCase() === text.toLowerCase()
                );
                updateEntry(index, 'user_id', matched ? matched.id : '');
              }}
              style={{ marginBottom: 4 }}
            />
            {item.user_name.length > 0 && suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(u) => `sug-${u.id}`}
                renderItem={({ item: u }) => (
                  <TouchableOpacity
                    onPress={() => {
                      updateEntry(index, 'user_name', `${u.first_name} ${u.last_name}`);
                      updateEntry(index, 'user_id', u.id);
                    }}
                  >
                    <List.Item title={`${u.first_name} ${u.last_name}`} description={`ID: ${u.id}`} />
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 100 }}
              />
            )}
          </>
        )}
      </View>
    );
  };

  // Header component hiển thị thông tin về tủ đồ và các mục nhập.
  const headerComponent = useMemo(() => (
    <View style={{ padding: 20 }}>
      <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 12 }}>📦 Tủ đồ</Text>
      {user?.is_staff && (
        <>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Gửi hàng cho cư dân:</Text>
          <FlatList
            data={entries}
            keyExtractor={(_, index) => `entry-${index}`}
            renderItem={renderEntry}
            scrollEnabled={false}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Button mode="outlined" onPress={addEntryRow} icon="plus">Thêm dòng</Button>
            <Button mode="contained" onPress={submitEntries} icon="send">Gửi hàng</Button>
          </View>
          <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 20 }} />
        </>
      )}
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Danh sách gói hàng:</Text>
    </View>
  ), [entries, users]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={items}
        keyExtractor={(item) => `locker-${item.id}`}
        ListHeaderComponent={headerComponent}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 12,
            borderRadius: 8,
            marginTop: 10,
            backgroundColor: '#f9f9f9',
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>📦 {item.item_name}</Text>
            <Text style={{ marginTop: 4 }}>
              👤 Cư dân: <Text style={{ fontWeight: '600' }}>{item.user_full_name || 'Ẩn danh'}</Text>
            </Text>
            <Text>📅 Trạng thái: {item.status === 'received' ? '✅ Đã nhận' : '📥 Chưa nhận'}</Text>
            {user?.is_staff && item.status !== 'received' && (
              <Button onPress={() => markReceived(item.id)} style={{ marginTop: 8 }}>✅ Xác nhận đã nhận</Button>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 40, fontStyle: 'italic' }}>
            Hiện không có gói hàng nào.
          </Text>
        )}
      />
    </KeyboardAvoidingView>
  );
}
