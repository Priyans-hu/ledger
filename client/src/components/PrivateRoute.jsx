import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
    const { token, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !token) {
            toast.error('You must be logged in to access this page');
        }
    }, [loading, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#36d7b7" size={150} />
            </div>
        );
    }

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
