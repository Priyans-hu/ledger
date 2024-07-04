import React, { useContext } from 'react';
import Footer from '../components/landing/Footer';
import Header from '../components/Header';
import ComingSoonComp from '../components/comingSoon';
import { AuthContext } from '../context/authContext';

const ComingSoon = () => {
    const { token, loading } = useContext(AuthContext);

    return (
        <div>
            {token && !loading && <Header />}
            <ComingSoonComp />
            {token && !loading && <Footer />}
        </div>
    );
};

export default ComingSoon;