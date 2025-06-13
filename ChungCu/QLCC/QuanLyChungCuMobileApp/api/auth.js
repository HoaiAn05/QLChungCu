import axios from 'axios';

const BASE_URL = 'http://192.168.150.102:8000'; 

export const getToken = async (username, password) => {
  const client_id = '72PXDDWT7KOHibb8Dp65jmrxlGa8hpnpVNAMILnj';
  const client_secret = '8LOg03UD7k8jE9Iedo2PBbXSIp4UY24iCoetnppyTtnUTmO1W8zDoaOW6Uo2WA34iVIqxIvbVKqlM31ajd79Huyxy2J79Ui7dgtvzZe9wjAR8zvGesxe5cXSEjTgOvcH';

  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);

    const res = await axios.post(`${BASE_URL}/o/token/`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res.data;
  } catch (err) {
    console.log('Lỗi khi lấy token:', err.response?.data || err.message);
    throw new Error('Lỗi đăng nhập');
  }
};
