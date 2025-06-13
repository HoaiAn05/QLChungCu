// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Alert, Button } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// export default function SurveyScreen() {
//   const { accessToken, BASE_URL, userInfo } = useContext(AuthContext);
//   const [surveys, setSurveys] = useState([]);
//   const [votes, setVotes] = useState({});
//   const isAdmin = userInfo?.is_staff;

//   useEffect(() => {
//     fetchSurveys();
//     if (isAdmin) {
//       fetchVotes();
//     }
//   }, []);

//   const fetchSurveys = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/surveys/`, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       setSurveys(res.data);
//     } catch (err) {
//       console.error('Lỗi khi tải khảo sát:', err);
//       Alert.alert('Lỗi', 'Không thể tải khảo sát');
//     }
//   };

//   const fetchVotes = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/votes/`, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       const voteCounts = {};
//       res.data.forEach(vote => {
//         voteCounts[vote.option] = (voteCounts[vote.option] || 0) + 1;
//       });
//       setVotes(voteCounts);
//     } catch (err) {
//       console.error('Lỗi khi tải phiếu bầu:', err);
//     }
//   };

//   const handleVote = async (optionId) => {
//     try {
//       await axios.post(`${BASE_URL}/votes/`, { option: optionId }, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       Alert.alert('Thành công', 'Bạn đã bỏ phiếu');
//       fetchSurveys();
//     } catch (err) {
//       console.error('Lỗi khi bỏ phiếu:', err);
//       Alert.alert('Lỗi', 'Bạn đã bỏ phiếu hoặc xảy ra lỗi');
//     }
//   };

//   // 👤 Người dân: hiển thị bình thường
//   const renderSurveyForUser = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.question}>{item.title}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//       {item.options?.map(opt => (
//         <View key={opt.id} style={styles.optionRow}>
//           <Text style={styles.optionText}>• {opt.text}</Text>
//           <Button title="Bỏ phiếu" onPress={() => handleVote(opt.id)} />
//         </View>
//       ))}
//     </View>
//   );

//   // 🛠️ Admin: chỉ hiển thị kết quả phiếu
//   const renderSurveyForAdmin = ({ item }) => (
//     <View style={styles.card}>
//       {item.options?.map(opt => (
//         <View key={opt.id} style={styles.optionRow}>
//           <Text style={styles.optionText}>• {opt.text}</Text>
//           <Text style={styles.voteCount}>{votes[opt.id] || 0} phiếu</Text>
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Khảo sát</Text>
//       <FlatList
//         data={surveys}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={isAdmin ? renderSurveyForAdmin : renderSurveyForUser}
//         ListEmptyComponent={<Text style={styles.empty}>Không có khảo sát nào.</Text>}
//       />
//     </SafeAreaView>
//   );
// }











import React, { useContext, useEffect, useState } from 'react'; 
// Import React và các hook cần thiết như useContext, useEffect, useState.

import { View, Text, StyleSheet, FlatList, Alert, Button } from 'react-native'; 
// Import các component từ React Native: View, Text, StyleSheet, FlatList, Alert, Button.

import { SafeAreaView } from 'react-native-safe-area-context'; 
// Import SafeAreaView để tránh các vùng không hiển thị trên màn hình (chẳng hạn như notch hoặc thanh trạng thái).

import axios from 'axios'; 
// Import axios để thực hiện các yêu cầu HTTP.

import { AuthContext } from '../context/AuthContext'; 
// Import AuthContext để lấy thông tin người dùng (như accessToken, BASE_URL, và userInfo) từ context.

export default function SurveyScreen() { 
  // Định nghĩa component SurveyScreen.
  const { accessToken, BASE_URL, userInfo } = useContext(AuthContext); 
  // Lấy accessToken, BASE_URL, và userInfo từ AuthContext.
  const isAdmin = userInfo?.is_staff; 
  // Kiểm tra xem người dùng có phải là admin hay không.

  const [surveys, setSurveys] = useState([]); 
  // State để lưu trữ danh sách các khảo sát.

  const [votes, setVotes] = useState({}); 
  // State để lưu trữ số lượng phiếu bầu cho mỗi lựa chọn (dành cho admin).

  // useEffect sẽ gọi fetchSurveys và fetchVotes khi component render lần đầu tiên.
  useEffect(() => { 
    fetchSurveys(); 
    if (isAdmin) { 
      fetchVotes(); // Nếu là admin, gọi hàm fetchVotes để tải số lượng phiếu bầu.
    }
  }, []); 

  const fetchSurveys = async () => { 
    // Hàm gọi API để tải danh sách khảo sát.
    try {
      const res = await axios.get(`${BASE_URL}/surveys/`, {
        headers: { Authorization: `Bearer ${accessToken}` } 
        // Gửi yêu cầu GET tới API để lấy các khảo sát, kèm theo accessToken trong header.
      });
      setSurveys(res.data); 
      // Cập nhật state surveys với dữ liệu trả về từ API.
    } catch (err) {
      console.error('Lỗi khi tải khảo sát:', err); 
      Alert.alert('Lỗi', 'Không thể tải khảo sát'); 
      // Nếu có lỗi, hiển thị thông báo lỗi.
    }
  };

  const fetchVotes = async () => { 
    // Hàm gọi API để tải số lượng phiếu bầu cho mỗi lựa chọn khảo sát.
    try {
      const res = await axios.get(`${BASE_URL}/votes/`, {
        headers: { Authorization: `Bearer ${accessToken}` } 
        // Gửi yêu cầu GET tới API để lấy phiếu bầu, kèm theo accessToken trong header.
      });
      const voteCounts = {}; 
      // Khởi tạo một đối tượng để lưu trữ số lượng phiếu bầu cho từng lựa chọn.

      res.data.forEach(vote => { 
        // Duyệt qua mỗi phiếu bầu và cập nhật số lượng phiếu bầu cho từng lựa chọn.
        voteCounts[vote.option] = (voteCounts[vote.option] || 0) + 1;
      });

      setVotes(voteCounts); 
      // Cập nhật state votes với số lượng phiếu bầu cho từng lựa chọn.
    } catch (err) {
      console.error('Lỗi khi tải phiếu bầu:', err);
      // In lỗi ra console nếu có lỗi trong quá trình gọi API.
    }
  };

  const handleVote = async (optionId) => { 
    // Hàm xử lý khi người dùng bấm bỏ phiếu.
    try {
      await axios.post(`${BASE_URL}/votes/`, { option: optionId }, {
        headers: { Authorization: `Bearer ${accessToken}` } 
        // Gửi yêu cầu POST để bỏ phiếu cho lựa chọn với optionId tương ứng, kèm theo accessToken trong header.
      });
      Alert.alert('Thành công', 'Bạn đã bỏ phiếu'); 
      // Hiển thị thông báo thành công khi người dùng bỏ phiếu.
      fetchSurveys(); 
      // Tải lại danh sách khảo sát để cập nhật kết quả.
    } catch (err) {
      console.error('Lỗi khi bỏ phiếu:', err); 
      Alert.alert('Lỗi', 'Bạn đã bỏ phiếu hoặc xảy ra lỗi'); 
      // Nếu có lỗi trong quá trình bỏ phiếu, hiển thị thông báo lỗi.
    }
  };

  // 👤 Người dân: hiển thị khảo sát và cho phép bỏ phiếu
  const renderSurveyForUser = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.question}>{item.title}</Text>
      {/* Hiển thị tiêu đề khảo sát */}
      <Text style={styles.description}>{item.description}</Text>
      {/* Hiển thị mô tả khảo sát */}
      {item.options?.map(opt => (
        <View key={opt.id} style={styles.optionRow}>
          <Text style={styles.optionText}>• {opt.text}</Text>
          {/* Hiển thị văn bản lựa chọn */}
          <Button title="Bỏ phiếu" onPress={() => handleVote(opt.id)} />
          {/* Hiển thị nút để người dùng bỏ phiếu cho lựa chọn */}
        </View>
      ))}
    </View>
  );

  // 🛠️ Admin: hiển thị kết quả phiếu bầu của khảo sát
  const renderSurveyForAdmin = ({ item }) => (
    <View style={styles.card}>
      {/* Duyệt qua tất cả các lựa chọn và hiển thị kết quả phiếu bầu cho admin */}
      {item.options?.map(opt => (
        <View key={opt.id} style={styles.optionRow}>
          <Text style={styles.optionText}>• {opt.text}</Text>
          {/* Hiển thị văn bản lựa chọn */}
          <Text style={styles.voteCount}>{votes[opt.id] || 0} phiếu</Text>
          {/* Hiển thị số lượng phiếu bầu cho lựa chọn */}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Khảo sát</Text>
      {/* Tiêu đề của màn hình */}

      <FlatList
        data={surveys} 
        keyExtractor={(item) => item.id.toString()} 
        // Lấy id của mỗi khảo sát làm key cho các phần tử trong FlatList
        renderItem={isAdmin ? renderSurveyForAdmin : renderSurveyForUser} 
        // Render khảo sát theo kiểu người dùng hoặc admin tùy vào quyền của người dùng
        ListEmptyComponent={<Text style={styles.empty}>Không có khảo sát nào.</Text>} 
        // Hiển thị thông báo khi không có khảo sát nào.
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  optionText: {
    fontSize: 15,
    flex: 1,
  },
  voteCount: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginLeft: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  }
});
