import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useAuth = () => {
    const { user, error, login, register, logout } = useContext(AuthContext);

    return { user, error, login, register, logout };
};

export default useAuth;
