import React, { createContext, useState, useEffect } from 'react';
import storeApiInstance from '../api/storeApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Optionally, fetch user data with the token
            fetchUserData(storedToken);
        }
        setLoading(false);
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await storeApiInstance.getUserData({ headers: { Authorization: `Bearer ${token}` } });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user data', error);
            logout();
        }
    };

    const login = async (credentials) => {
        try {
            const response = await storeApiInstance.loginStore(credentials);
            setToken(response.data.token);
            toast.success('Login successful!');
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error', error);
            toast.error('Login failed! Please try again.');
            throw error;
        }
    };

    const register = async (storeData) => {
        try {
            const response = await storeApiInstance.registerStore(storeData);
            setToken(response.data.token);
            toast.success('Registration successful!');
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Register error', error);
            toast.error('Registration failed! Please try again.');
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        toast.success('Logout successful!');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;