import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';
import Footer from '../components/Footer';
import customerApiInstance from '../api/customerApi'

const AddCustomer = () => {
    const initialValues = {
        name: '',
        email: '',
        phonenumber: '',
        address: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phonenumber: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required')
    });

    const onSubmit = (values, { resetForm }) => {
        customerApiInstance.createCustomer(values);
        resetForm();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                <div className="max-w-4xl mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6">Add Customer</h1>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                {...formik.getFieldProps('name')}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phonenumber" className="block font-medium text-gray-700">Phone Number</label>
                            <input
                                id="phonenumber"
                                type="text"
                                {...formik.getFieldProps('phonenumber')}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.phonenumber && formik.errors.phonenumber ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.phonenumber && formik.errors.phonenumber && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.phonenumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="address" className="block font-medium text-gray-700">Address</label>
                            <textarea
                                id="address"
                                {...formik.getFieldProps('address')}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.address && formik.errors.address && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                disabled={!formik.isValid || formik.isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AddCustomer;
