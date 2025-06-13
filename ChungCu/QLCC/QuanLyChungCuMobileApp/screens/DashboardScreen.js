import React, { useContext } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const profileCompleted = user?.profile_completed;

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleUpdateProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.header}>
            {user?.avatar ? (
              <Avatar.Image size={64} source={{ uri: user.avatar }} />
            ) : (
              <Avatar.Text size={64} label="?" />
            )}
            <View style={{ marginLeft: 16 }}>
              <Title style={styles.title}>
                Xin chào, {user?.first_name} {user?.last_name}
              </Title>
              <Paragraph>Vai trò: {isAdmin ? 'Quản trị viên' : 'Cư dân'}</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {!profileCompleted ? (
          <Card style={styles.warningCard}>
            <Card.Content>
              <Paragraph style={styles.warningText}>
                Vui lòng cập nhật ảnh đại diện và thay đổi mật khẩu mặc định trước khi sử dụng hệ thống.
              </Paragraph>
              <Button mode="contained" style={styles.button} onPress={handleUpdateProfile}>
                Cập nhật hồ sơ
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph>SĐT: {user?.phone || '(chưa cập nhật)'}</Paragraph>
                <Paragraph>Địa chỉ: {user?.address || '(chưa cập nhật)'}</Paragraph>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Profile')}>
                  Hồ sơ cá nhân
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Feedback')}>
                  Gửi phản ánh
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Surveys')}>
                  Khảo sát
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Locker')}>
                  Tủ đồ
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Payments')}>
                  Thanh toán
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Relative')}>
                  Đăng ký người thân
                </Button>
                {isAdmin && (
                    <>
                      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('SurveyResults')}>
                        Xem kết quả khảo sát
                      </Button>
                      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('CreateSurvey')}>
                        Tạo khảo sát
                      </Button>
                      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Transfer')}>
                        Chuyển nhượng nhà
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => navigation.navigate('CreateResident')}
                        style={styles.button}
                      >
                        Tạo cư dân mới
                      </Button>

                    </>
                  
                )}
                <Button mode="outlined" textColor="red" style={styles.logoutButton} onPress={handleLogout}>
                  Đăng xuất
                </Button>
              </Card.Content>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 8,
    borderRadius: 12,
  },
  warningCard: {
    marginTop: 16,
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
  },
  warningText: {
    color: '#856404',
    marginBottom: 10,
  },
  button: {
    marginVertical: 6,
  },
  logoutButton: {
    marginTop: 20,
    borderColor: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});




