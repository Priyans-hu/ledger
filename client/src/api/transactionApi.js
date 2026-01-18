import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class TransactionAPI {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/transaction`,
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

  createTransaction(transactionData) {
    return this.api.post('/', transactionData);
  }

  updateTransaction(transactionId, transactionData) {
    return this.api.put(`/${transactionId}`, transactionData);
  }

  deleteTransaction(transactionId) {
    return this.api.delete(`/${transactionId}`);
  }

  getAllTransactions(params = {}) {
    return this.api.get('/', { params });
  }

  getTransactionsByDate(date) {
    return this.api.get('/date', { params: { date } });
  }

  getTransactionsByMonth(month, year) {
    return this.api.get('/month', { params: { month, year } });
  }

  getTransactionsByPeriod(startDate, endDate) {
    return this.api.get('/period', { params: { startDate, endDate } });
  }

  getTransactionsByCustomer(customerId) {
    return this.api.get(`/customer/${customerId}`);
  }

  getAllCreditTransactions() {
    return this.api.get('/credit');
  }

  getAllDebitTransactions() {
    return this.api.get('/debit');
  }

  getMonthlyTransactions() {
    return this.api.get('/past12months');
  }

  exportTransactions(params = {}) {
    return this.api.get('/export', {
      params,
      responseType: params.format === 'csv' ? 'blob' : 'json'
    });
  }

  getExpenseSummary(params = {}) {
    return this.api.get('/expense-summary', { params });
  }
}

const transactionApiInstance = new TransactionAPI();
export default transactionApiInstance;
