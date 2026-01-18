import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class InvoiceAPI {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/invoice`,
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

  createInvoice(invoiceData) {
    return this.api.post('/', invoiceData);
  }

  getInvoiceById(invoiceId) {
    return this.api.get(`/${invoiceId}`);
  }

  getAllInvoices(params = {}) {
    return this.api.get('/', { params });
  }

  updateInvoice(invoiceId, invoiceData) {
    return this.api.put(`/${invoiceId}`, invoiceData);
  }

  deleteInvoice(invoiceId) {
    return this.api.delete(`/${invoiceId}`);
  }

  getInvoiceSummary() {
    return this.api.get('/summary');
  }
}

const invoiceApiInstance = new InvoiceAPI();
export default invoiceApiInstance;
