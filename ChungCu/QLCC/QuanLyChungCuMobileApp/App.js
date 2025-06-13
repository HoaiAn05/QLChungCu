import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'; // 👈 Thêm dòng này
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import PaymentScreen from './screens/PaymentScreen';
import LockerScreen from './screens/LockerScreen';
import SurveyScreen from './screens/SurveyScreen';
import CreateSurveyScreen from './screens/CreateSurveyScreen';
import RelativeScreen from './screens/RelativeScreen';
import ProfileScreen from './screens/ProfileScreen';
import InvoiceListScreen from './screens/InvoiceListScreen';
import TransferScreen from './screens/TransferScreen';
import CreateResidentScreen from './screens/CreateResidentScreen';
import SurveyResultsScreen from './screens/SurveyResultsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider> 
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="Payments" component={PaymentScreen} />
            <Stack.Screen name="Locker" component={LockerScreen} />
            <Stack.Screen name="Surveys" component={SurveyScreen} />
            <Stack.Screen name="CreateSurvey" component={CreateSurveyScreen} />
            <Stack.Screen name="Relative" component={RelativeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="InvoiceListScreen" component={InvoiceListScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} options={{ title: 'Chuyển nhượng nhà' }} />
            <Stack.Screen name="CreateResident" component={CreateResidentScreen} options={{ title: 'Tạo cư dân mới' }} />
            <Stack.Screen name="SurveyResults" component={SurveyResultsScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
