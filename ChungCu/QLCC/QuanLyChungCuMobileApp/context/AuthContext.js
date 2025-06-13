import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const BASE_URL = 'http://192.168.150.102:8000'; 

  const login = async (username, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', username);
      formData.append('password', password);
      formData.append('client_id', 'IAmEE9ag3cEB98MHfqk7hxYobXfux8LwQmI8pS3W');
      formData.append('client_secret', 'aIYWaxiiIh8OIC9J2EnwifNkp6D1mDwUwuTUpbb8GBZIAknxkcVMBEAeZGYTdJ36ZBHQgLs3Q2mAkFe4TgFgwGqUK8CD8gpn1CX95RLQLDILfiogRDb5Z8dLoPAIhxDa');

      const res = await axios.post(`${BASE_URL}/o/token/`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token = res.data.access_token;
      setAccessToken(token);
      await SecureStore.setItemAsync('access_token', token);
      fetchUser(token);
    } catch (err) {
      console.log('Login failed:', err.response?.data || err.message);
      throw new Error('Đăng nhập thất bại');
    }
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await SecureStore.deleteItemAsync('access_token');
  };

  const fetchUser = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/current_user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.log('Không lấy được thông tin user', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      if (token) {
        setAccessToken(token);
        fetchUser(token);
      }
    };
    loadToken();
  }, []);

  return (
  <AuthContext.Provider value={{ user, accessToken, login, logout, BASE_URL, fetchUser }}>
    {children}
  </AuthContext.Provider>
);

};
export const useAuth = () => useContext(AuthContext);