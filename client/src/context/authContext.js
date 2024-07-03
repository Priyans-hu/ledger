import React, { createContext, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('/stores/login', credentials);
            setUser(response.data.user);
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axiosInstance.post('/stores/register', userData);
            setUser(response.data.user);
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ user, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};