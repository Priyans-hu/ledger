import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class StoreAPI {
    constructor() {
        this.storeApi = axios.create({
            baseURL: `${API_BASE_URL}/api/store`,
            withCredentials: true,
        });
    }

    registerStore(storeData) {
        return this.storeApi.post('/register', storeData);
    }

    loginStore(credentials) {
        return this.storeApi.post('/login', credentials);
    }
}

const storeApiInstance = new StoreAPI();
export default storeApiInstance;
