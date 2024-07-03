import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class CustomerAPI {
    constructor() {
        this.customerApi = axios.create({
            baseURL: `${API_BASE_URL}/customer`,
            withCredentials: true,
        });
    }

    createCustomer(customerData) {
        return this.customerApi.post('/', customerData);
    }

    getCustomerById(customerId) {
        return this.customerApi.get(`/${customerId}`);
    }

    getAllCustomers(storeId) {
        return this.customerApi.get('/store', { params: { storeId } });
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
