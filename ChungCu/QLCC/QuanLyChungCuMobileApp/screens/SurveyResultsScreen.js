// import React, { useContext, useEffect, useState } from 'react';
// import { View, StyleSheet, Alert, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Text, Title, ActivityIndicator, Card, ProgressBar } from 'react-native-paper';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// export default function SurveyResultsScreen() {
//   const { accessToken, user, BASE_URL } = useContext(AuthContext);
//   const isAdmin = user?.role === 'admin';
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchResults = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/surveys/results/`, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       setResults(res.data);
//     } catch (err) {
//       console.error('Error fetching survey results:', err);
//       Alert.alert('Lỗi', 'Không thể tải kết quả khảo sát');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAdmin) {
//       fetchResults();
//     }
//   }, [isAdmin]);

//   if (!isAdmin) {
//     return (
//       <SafeAreaView style={styles.root}>
//         <Text style={{ textAlign: 'center', marginTop: 20 }}>Bạn không có quyền truy cập trang này.</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.root}>
//       <Title style={styles.title}>Kết quả khảo sát</Title>
//       {loading ? (
//         <ActivityIndicator animating size="large" style={{ marginTop: 40 }} />
//       ) : (
//         <ScrollView>
//           {results.map((survey, index) => (
//             <Card key={index} style={styles.card}>
//               <Card.Content>
//                 <Title style={styles.question}>{survey.title}</Title>
//                 {survey.options.map((option, idx) => {
//                   const percent = survey.total_votes > 0
//                     ? option.vote_count / survey.total_votes
//                     : 0;
//                   return (
//                     <View key={idx} style={styles.option}>
//                       <Text>{option.text}</Text>
//                       <ProgressBar progress={percent} style={styles.progress} />
//                       <Text style={styles.percent}>
//                         {option.vote_count} lượt chọn ({Math.round(percent * 100)}%)
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </Card.Content>
//             </Card>
//           ))}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   root: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   title: { marginBottom: 12 },
//   card: { marginBottom: 16 },
//   question: { marginBottom: 10 },
//   option: { marginBottom: 12 },
//   progress: { height: 6, marginVertical: 4, borderRadius: 3 },
//   percent: { fontSize: 12, color: '#666' }
// });


















































import React, { useContext, useEffect, useState } from 'react'; 
import { View, StyleSheet, Alert, ScrollView } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Text, Title, ActivityIndicator, Card, ProgressBar } from 'react-native-paper'; 
import axios from 'axios'; 
import { AuthContext } from '../context/AuthContext'; 
// Import AuthContext để lấy thông tin xác thực người dùng (như accessToken và user).

export default function SurveyResultsScreen() { 
  // Định nghĩa component SurveyResultsScreen.
  
  const { accessToken, user, BASE_URL } = useContext(AuthContext); 
  // Lấy accessToken, user và BASE_URL từ AuthContext để xác thực và gọi API.

  const isAdmin = user?.role === 'admin'; 
  // Kiểm tra nếu người dùng có quyền admin hay không.

  const [results, setResults] = useState([]); 
  // State để lưu trữ kết quả khảo sát.

  const [loading, setLoading] = useState(false); 
  // State để quản lý trạng thái tải dữ liệu (loading).

  const fetchResults = async () => { 
    // Hàm gọi API để lấy kết quả khảo sát.
    
    setLoading(true); 
    // Bắt đầu tải dữ liệu, đặt loading = true.
    
    try {
      const res = await axios.get(`${BASE_URL}/surveys/results/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }); 
      // Gửi yêu cầu GET đến API để lấy kết quả khảo sát với token xác thực.
      
      setResults(res.data); 
      // Cập nhật state results với dữ liệu nhận được từ API.
    } catch (err) {
      console.error('Error fetching survey results:', err); 
      // Nếu có lỗi trong quá trình gọi API, in lỗi ra console.
      Alert.alert('Lỗi', 'Không thể tải kết quả khảo sát'); 
      // Hiển thị thông báo lỗi cho người dùng.
    } finally {
      setLoading(false); 
      // Sau khi xong (thành công hay lỗi), đặt loading = false.
    }
  };

  useEffect(() => { 
    // Dùng hook useEffect để gọi fetchResults khi component render lần đầu tiên.
    if (isAdmin) {
      fetchResults(); 
      // Nếu người dùng là admin, gọi hàm fetchResults để lấy kết quả khảo sát.
    }
  }, [isAdmin]); 
  // useEffect chỉ chạy khi isAdmin thay đổi.

  if (!isAdmin) {
    // Nếu người dùng không phải là admin, hiển thị thông báo.
    return (
      <SafeAreaView style={styles.root}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Bạn không có quyền truy cập trang này.</Text>
        {/* Thông báo lỗi cho người dùng không phải admin */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Title style={styles.title}>Kết quả khảo sát</Title>
      {/* Tiêu đề của màn hình */}

      {loading ? ( 
        // Nếu đang tải dữ liệu (loading), hiển thị ActivityIndicator.
        <ActivityIndicator animating size="large" style={{ marginTop: 40 }} />
      ) : (
        // Khi dữ liệu đã tải xong, hiển thị danh sách kết quả khảo sát.
        <ScrollView>
          {results.map((survey, index) => (
            // Duyệt qua danh sách kết quả khảo sát và render từng khảo sát.
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Title style={styles.question}>{survey.title}</Title>
                {/* Hiển thị tiêu đề khảo sát */}
                
                {survey.options.map((option, idx) => {
                  // Duyệt qua các lựa chọn của mỗi khảo sát.
                  const percent = survey.total_votes > 0
                    ? option.vote_count / survey.total_votes
                    : 0;
                  // Tính toán tỷ lệ phần trăm bình chọn cho mỗi lựa chọn.
                  
                  return (
                    <View key={idx} style={styles.option}>
                      <Text>{option.text}</Text>
                      {/* Hiển thị văn bản của lựa chọn */}
                      <ProgressBar progress={percent} style={styles.progress} />
                      {/* Hiển thị ProgressBar để thể hiện tỷ lệ phần trăm */}
                      <Text style={styles.percent}>
                        {option.vote_count} lượt chọn ({Math.round(percent * 100)}%)
                        {/* Hiển thị số lượng bình chọn và tỷ lệ phần trăm */}
                      </Text>
                    </View>
                  );
                })}
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: '#fff' }, 
  // Style cho phần root, bao gồm padding và nền trắng.
  
  title: { marginBottom: 12 }, 
  // Style cho tiêu đề, thêm margin dưới.

  card: { marginBottom: 16 }, 
  // Style cho mỗi Card (khảo sát), thêm margin dưới.

  question: { marginBottom: 10 }, 
  // Style cho câu hỏi của khảo sát, thêm margin dưới.

  option: { marginBottom: 12 }, 
  // Style cho mỗi lựa chọn, thêm margin dưới.

  progress: { height: 6, marginVertical: 4, borderRadius: 3 }, 
  // Style cho ProgressBar, chỉnh sửa chiều cao, margin và borderRadius.

  percent: { fontSize: 12, color: '#666' }, 
  // Style cho phần trăm, chỉnh font-size và màu sắc.
});
