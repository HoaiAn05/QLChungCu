// import React, { useContext, useState } from 'react';
// import { ScrollView, Alert } from 'react-native';
// import { TextInput, Button, Text, Title } from 'react-native-paper';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';

// export default function CreateSurveyScreen({ navigation }) {
//   const { accessToken, BASE_URL } = useContext(AuthContext);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [options, setOptions] = useState(['', '']);

//   const updateOption = (text, index) => {
//     const newOptions = [...options];
//     newOptions[index] = text;
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     setOptions([...options, '']);
//   };

//   const handleSubmit = async () => {
//     if (!title.trim() || options.some(opt => !opt.trim())) {
//       Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/surveys/`, {
//         title,
//         description,
//         options: options.map(opt => ({ text: opt }))
//       }, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//       });
//       Alert.alert('Thành công', 'Đã tạo khảo sát');
//       setTitle('');
//       setDescription('');
//       setOptions(['', '']);
//       navigation.goBack();
//     } catch (err) {
//       Alert.alert('Lỗi', 'Không thể tạo khảo sát');
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 20 }}>
//       <Title>Tạo khảo sát</Title>
//       <TextInput label="Tiêu đề" value={title} onChangeText={setTitle} style={{ marginBottom: 10 }} />
//       <TextInput label="Mô tả" value={description} onChangeText={setDescription} multiline style={{ marginBottom: 10 }} />
//       {options.map((opt, idx) => (
//         <TextInput
//           key={idx}
//           label={`Lựa chọn ${idx + 1}`}
//           value={opt}
//           onChangeText={(text) => updateOption(text, idx)}
//           style={{ marginBottom: 10 }}
//         />
//       ))}
//       <Button mode="outlined" onPress={addOption} style={{ marginBottom: 10 }}>Thêm lựa chọn</Button>
//       <Button mode="contained" onPress={handleSubmit}>Tạo khảo sát</Button>
//     </ScrollView>
//   );
// }


























import React, { useContext, useState } from 'react'; // Import React và các hook cần thiết.
import { ScrollView, Alert } from 'react-native'; // Import các component của React Native.
import { TextInput, Button, Text, Title } from 'react-native-paper'; // Các component UI từ thư viện react-native-paper.
import { AuthContext } from '../context/AuthContext'; // Lấy context xác thực từ AuthContext.
import axios from 'axios'; // Import axios để thực hiện các yêu cầu HTTP.

export default function CreateSurveyScreen({ navigation }) { 
  // Định nghĩa component CreateSurveyScreen, nhận prop 'navigation' để điều hướng màn hình.
  const { accessToken, BASE_URL } = useContext(AuthContext); 
  // Lấy 'accessToken' và 'BASE_URL' từ AuthContext (dùng cho xác thực và API).
  
  const [title, setTitle] = useState(''); 
  // State để lưu tiêu đề của khảo sát.
  
  const [description, setDescription] = useState(''); 
  // State để lưu mô tả của khảo sát.
  
  const [options, setOptions] = useState(['', '']); 
  // State lưu danh sách các lựa chọn cho khảo sát (mỗi lựa chọn là một chuỗi).
  
  const updateOption = (text, index) => { 
    // Hàm này dùng để cập nhật giá trị của lựa chọn cụ thể tại vị trí 'index'.
    const newOptions = [...options]; 
    // Tạo một bản sao của mảng 'options' để tránh thay đổi trực tiếp state.
    newOptions[index] = text; 
    // Cập nhật giá trị của lựa chọn tại 'index'.
    setOptions(newOptions); 
    // Cập nhật lại state với mảng lựa chọn mới.
  };

  const addOption = () => { 
    // Hàm này dùng để thêm một lựa chọn mới vào mảng 'options'.
    setOptions([...options, '']); 
    // Thêm một phần tử rỗng vào cuối mảng, để người dùng có thể nhập thêm lựa chọn mới.
  };

  const handleSubmit = async () => { 
    // Hàm này xử lý khi người dùng nhấn nút "Tạo khảo sát".
    if (!title.trim() || options.some(opt => !opt.trim())) { 
      // Kiểm tra xem tiêu đề và tất cả lựa chọn có được nhập đầy đủ không (không chỉ chứa khoảng trắng).
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      // Nếu thiếu thông tin, hiển thị thông báo lỗi.
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/surveys/`, { 
        // Gửi yêu cầu POST đến API để tạo khảo sát mới.
        title, // Gửi tiêu đề khảo sát.
        description, // Gửi mô tả khảo sát.
        options: options.map(opt => ({ text: opt })) // Gửi các lựa chọn dưới dạng mảng đối tượng với thuộc tính 'text'.
      }, {
        headers: { Authorization: `Bearer ${accessToken}` } 
        // Đính kèm token xác thực vào header để gửi yêu cầu bảo mật.
      });
      Alert.alert('Thành công', 'Đã tạo khảo sát');
      // Hiển thị thông báo thành công.
      setTitle(''); 
      setDescription(''); 
      setOptions(['', '']); 
      // Reset các trường nhập liệu sau khi tạo khảo sát thành công.
      navigation.goBack(); 
      // Quay lại màn hình trước đó.
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể tạo khảo sát');
      // Nếu có lỗi, hiển thị thông báo lỗi.
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}> 
      {/* ScrollView cho phép cuộn nếu nội dung quá dài */}
      <Title>Tạo khảo sát</Title> 
      {/* Tiêu đề màn hình */}
      
      <TextInput 
        label="Tiêu đề" 
        value={title} 
        onChangeText={setTitle} 
        style={{ marginBottom: 10 }} 
      /> 
      {/* Input cho tiêu đề khảo sát, khi thay đổi gọi hàm setTitle để cập nhật state */}
      
      <TextInput 
        label="Mô tả" 
        value={description} 
        onChangeText={setDescription} 
        multiline 
        style={{ marginBottom: 10 }} 
      /> 
      {/* Input cho mô tả khảo sát, cho phép người dùng nhập nhiều dòng */}
      
      {options.map((opt, idx) => ( 
        // Duyệt qua tất cả các lựa chọn và tạo input cho mỗi lựa chọn.
        <TextInput 
          key={idx} 
          label={`Lựa chọn ${idx + 1}`} 
          value={opt} 
          onChangeText={(text) => updateOption(text, idx)} 
          style={{ marginBottom: 10 }} 
        /> 
      ))}

      <Button mode="outlined" onPress={addOption} style={{ marginBottom: 10 }}> 
        Thêm lựa chọn 
      </Button> 
      {/* Nút để thêm một lựa chọn mới vào danh sách */}
      
      <Button mode="contained" onPress={handleSubmit}>Tạo khảo sát</Button> 
      {/* Nút để gửi khảo sát */}
    </ScrollView>
  );
}
