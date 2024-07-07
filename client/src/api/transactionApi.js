import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class TransactionAPI {
    constructor() {
        this.transactionApi = axios.create({
            baseURL: `${API_BASE_URL}/api/transaction`,
            withCredentials: true,
        });

        this.transactionApi.interceptors.request.use(
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

    createTransaction(transactionData) {
        return this.transactionApi.post('/', transactionData);
    }

    getAllTransactions() {
        return this.transactionApi.get('/');
    }

    getTransactionsByDate(date) {
        return this.transactionApi.get('/date', { params: { date } });
    }

    getTransactionsByPeriod(start, end) {
        return this.transactionApi.get('/period', { params: { start, end } });
    }

    getTransactionsByMonth(month) {
        return this.transactionApi.get('/month', { params: { month } });
    }

    getTransactionsByYear(year) {
        return this.transactionApi.get('/month', { params: { year } });
    }

    getTransactionsByCustomer(customerId) {
        return this.transactionApi.get('/customer', { params: { customerId } });
    }

    getAllCreditTransactions() {
        return this.transactionApi.get('/credit');
    }

    getAllDebitTransactions() {
        return this.transactionApi.get('/debit');
    }

    getMonthlyTransactions() {
        return this.transactionApi.get('/past12months');
    }
}

const transactionApiInstance = new TransactionAPI();
export default transactionApiInstance;
