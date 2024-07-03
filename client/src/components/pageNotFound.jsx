import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFoundComp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
                <p className="text-gray-600">Oops! The page you are looking for does not exist.</p>
                <p className="text-gray-600">Let's go back to <Link to="/" className="text-blue-600 hover:underline">home</Link>.</p>
            </div>
        </div>
    );
};

export default PageNotFoundComp;