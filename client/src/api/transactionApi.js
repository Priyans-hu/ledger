import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class TransactionAPI {
    constructor() {
        this.transactionApi = axios.create({
            baseURL: `${API_BASE_URL}/transaction`,
            withCredentials: true,
        });
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

    getTransactionsByCustomer(customerId) {
        return this.transactionApi.get('/customer', { params: { customerId } });
    }

    getAllCreditTransactions() {
        return this.transactionApi.get('/credit');
    }

    getAllDebitTransactions() {
        return this.transactionApi.get('/debit');
    }
}

const transactionApiInstance = new TransactionAPI();
export default transactionApiInstance;
