import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthActions } from '../hooks/useAuth';
import landing_image from '../images/landing.webp';

const Signup = () => {
    const { register } = useAuthActions();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        storeName: '',
        phoneNumber: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        storeName: Yup.string()
            .required('Store name is required')
            .min(3, 'Store name must be at least 3 characters'),
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
            const result = await register(values);
            if (result && result.success) {
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration Error:', error);
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

    const features = [
        'Unlimited customer management',
        'GST-compliant invoicing',
        'Expense tracking & analytics',
        'PDF & CSV exports',
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left side - Image (shown on desktop) */}
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
                            Start managing your shop today
                        </h2>
                        <p className="text-slate-300 mb-8">
                            Join hundreds of shop owners who have simplified their business with Ledger.
                        </p>

                        {/* Features list */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10"
                                >
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-white text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
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

            {/* Right side - Form */}
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
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h1>
                        <p className="text-slate-600">Start your free trial today. No credit card required.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Store Name */}
                        <div>
                            <label htmlFor="storeName" className="block text-sm font-medium text-slate-700 mb-2">
                                Store Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <input
                                    id="storeName"
                                    name="storeName"
                                    type="text"
                                    autoComplete="organization"
                                    placeholder="Enter your store name"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                        formik.touched.storeName && formik.errors.storeName
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 transition-colors`}
                                    value={formik.values.storeName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    data-testid="signup-store-input"
                                />
                            </div>
                            {formik.touched.storeName && formik.errors.storeName && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.storeName}</p>
                            )}
                        </div>

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
                                    data-testid="signup-phone-input"
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
                                    autoComplete="new-password"
                                    placeholder="Create a password (min 6 characters)"
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                                        formik.touched.password && formik.errors.password
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 transition-colors`}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    data-testid="signup-password-input"
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

                        {/* Terms agreement */}
                        <p className="text-sm text-slate-500">
                            By creating an account, you agree to our{' '}
                            <Link to="#" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
                            {' '}and{' '}
                            <Link to="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>.
                        </p>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={!formik.isValid || isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            data-testid="signup-submit-btn"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Sign in link */}
                    <p className="mt-8 text-center text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
