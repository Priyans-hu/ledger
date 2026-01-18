import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthActions } from '../hooks/useAuth';
import landing_image from '../images/landing.webp';

const Login = () => {
    const { login } = useAuthActions();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            await login(values);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-slate-900">Ledger</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
                        <p className="text-slate-600">Sign in to your account to continue</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="Enter your 10-digit number"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                        formik.touched.phoneNumber && formik.errors.phoneNumber
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 transition-colors`}
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    data-testid="login-phone-input"
                                />
                            </div>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.phoneNumber}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                                        formik.touched.password && formik.errors.password
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 transition-colors`}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    data-testid="login-password-input"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>
                            <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={!formik.isValid || isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            data-testid="login-submit-btn"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-8 text-center text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative flex flex-col items-center justify-center p-12 w-full">
                    <div className="max-w-lg text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Manage your business effortlessly
                        </h2>
                        <p className="text-slate-300">
                            Track customers, manage expenses, generate invoices, and grow your business with powerful analytics.
                        </p>
                    </div>

                    {/* Dashboard preview */}
                    <div className="relative w-full max-w-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-20 scale-95"></div>
                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                            </div>
                            <img
                                src={landing_image}
                                alt="Ledger Dashboard"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
