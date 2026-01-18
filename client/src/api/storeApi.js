import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class StoreAPI {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/store`,
      withCredentials: true,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const code = error.response?.data?.code;
          if (code === 'TOKEN_EXPIRED' || code === 'INVALID_TOKEN') {
            Cookies.remove('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  registerStore(storeData) {
    return this.api.post('/register', storeData);
  }

  loginStore(credentials) {
    return this.api.post('/login', credentials);
  }

  getProfile() {
    return this.api.get('/profile');
  }

  updateProfile(profileData) {
    return this.api.put('/profile', profileData);
  }

  changePassword(passwordData) {
    return this.api.put('/change-password', passwordData);
  }

  verifyToken() {
    return this.api.get('/verify-token');
  }
}

const storeApiInstance = new StoreAPI();
export default storeApiInstance;
