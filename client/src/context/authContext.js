import React, { createContext, useState, useEffect } from 'react';
import storeApiInstance from '../api/storeApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await storeApiInstance.loginStore(credentials);
            setToken(response.data.token);
            toast.success('Login successful!');
            Cookies.set('token', response.data.token, { expires: 1 });
        } catch (error) {
            console.error('Login error', error);
            if (error.response && error.response.data && error.response.data.message === 'Invalid credentials') {
                toast.error('Invalid credentials! Please try again.');
            } else {
                toast.error('Login failed! Please try again.');
            }
            throw error;
        }
    };

    const register = async (storeData) => {
        try {
            const response = await storeApiInstance.registerStore(storeData);
            setToken(response.data.token);
            toast.success('Registration successful!');
            Cookies.set('token', response.data.token, { expires: 1 });
        } catch (error) {
            console.error('Register error', error);
            if (error.response && error.response.data && error.response.data.message === 'account already exists') {
                toast.error('An account with this phone number already exists. Please try with a different phone number.');
            } else {
                toast.error('Registration failed! Please try again.');
            }
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        toast.success('Logout successful!');
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;