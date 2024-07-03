import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthActions } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const { register } = useAuthActions();
    const navigate = useNavigate();

    const initialValues = {
        phoneNumber: '',
        password: '',
        storeName: '',
    };

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        storeName: Yup.string()
            .required('Store name is required')
            .min(3, 'Store name must be at least 3 characters'),
    });

    const handleSubmit = async (values) => {
        try {
            const result = await register(values);
            console.log(result);
            if (result && result.success) {
                toast.success('Registration successful!');
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            toast.error('Registration failed! Please try again.');
            console.error('Registration Error:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="storeName" className="sr-only">
                                Store Name
                            </label>
                            <input
                                id="storeName"
                                name="storeName"
                                type="text"
                                autoComplete="organization"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                placeholder="Store Name"
                                value={formik.values.storeName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.storeName && formik.errors.storeName ? (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.storeName}</p>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">
                                Mobile Number
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                autoComplete="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Mobile Number"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</p>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Sign up
                        </button>
                        <Link to="/login" className="mt-2 text-sm text-gray-600 hover:text-gray-900">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
