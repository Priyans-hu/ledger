import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthActions } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { login } = useAuthActions();
    const navigate = useNavigate();

    const initialValues = {
        phoneNumber: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    });

    const handleSubmit = async (values) => {
        try {
            await login(values);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Phone Number"
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
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Sign in
                        </button>
                        <Link to="/signup" className="mt-2 text-sm text-gray-600 hover:text-gray-900">
                            Don't have an account! Create now.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;