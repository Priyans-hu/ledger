import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useAuthState = () => {
    const { user, loading } = useAuth();
    return { user, loading };
};

export const useAuthActions = () => {
    const { login, register, logout } = useAuth();
    return { login, register, logout };
};
