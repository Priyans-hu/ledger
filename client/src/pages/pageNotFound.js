import React, { useContext } from 'react';
import Footer from '../components/landing/Footer';
import Header from '../components/Header';
import PageNotFoundComp from '../components/pageNotFound'
import { AuthContext } from '../context/authContext';

const PageNotFound = () => {
    const { token, loading } = useContext(AuthContext);

    return (
        <div>
            {token && !loading && <Header />}
            <PageNotFoundComp />
            {token && !loading && <Footer />}
        </div>
    )
}

export default PageNotFound;