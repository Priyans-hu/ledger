import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class CustomerAPI {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/customer`,
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
  }

  createCustomer(customerData) {
    return this.api.post('/', customerData);
  }

  getCustomerById(customerId) {
    return this.api.get(`/${customerId}`);
  }

  getAllCustomers(params = {}) {
    return this.api.get('/', { params });
  }

  updateCustomer(customerId, updatedData) {
    return this.api.put(`/${customerId}`, updatedData);
  }

  deleteCustomer(customerId) {
    return this.api.delete(`/${customerId}`);
  }
}

const customerApiInstance = new CustomerAPI();
export default customerApiInstance;
