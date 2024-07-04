import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class CustomerAPI {
    constructor() {
        this.customerApi = axios.create({
            baseURL: `${API_BASE_URL}/api/customer`,
            withCredentials: true,
        });

        this.customerApi.interceptors.request.use(
            (config) => {
                const token = Cookies.get('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    createCustomer(customerData) {
        return this.customerApi.post('/', customerData);
    }

    getCustomerById(customerId) {
        return this.customerApi.get(`/${customerId}`);
    }

    getAllCustomers(storeId) {
        return this.customerApi.get('/store', {
            params: { storeId },
        });
    }

    updateCustomer(customerId, updatedData) {
        return this.customerApi.put(`/${customerId}`, updatedData);
    }

    deleteCustomer(customerId) {
        return this.customerApi.delete(`/${customerId}`);
    }
}

const customerApiInstance = new CustomerAPI();
export default customerApiInstance;