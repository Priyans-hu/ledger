import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem } from '@mui/material';
import transactionApi from '../api/transactionApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const AddTransaction = () => {
    const formik = useFormik({
        initialValues: {
            amount: '',
            description: '',
            date: '',
            type: '',
            method: '',
            customerid: ''
        },
        validationSchema: Yup.object({
            amount: Yup.number()
                .required('Amount is required')
                .integer('Amount must be a valid integer')
                .positive('Amount must be a positive number'),
            type: Yup.string().required('Type is required'),
            method: Yup.string().required('Method is required'),
            customerid: Yup.number()
                .integer('Customer ID must be a valid integer')
                .positive('Customer ID must be a positive number'),
        }),
        onSubmit: async (values) => {
            try {
                await transactionApi.createTransaction(values);
                toast.success('Transaction added successfully');
            } catch (error) {
                toast.error('Failed to add transaction');
            }
        }
    });

    return (
        <>
            <Header />
            <div className="container mx-auto my-16 p-4 max-w-md min-h-[80vh]">
                <h1 className="text-4xl text-center font-bold mb-8">Add Transaction</h1>
                <div className='h-full flex items-center justify-center p-8 bg-gray-100 rounded-lg'>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            id="amount"
                            name="amount"
                            label={
                                <>
                                    Amount <span className="text-red-500">*</span>
                                </>
                            }
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            id="date"
                            name="date"
                            label={
                                <>
                                    Date <span className="text-red-500">*</span>
                                </>
                            }
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            id="type"
                            name="type"
                            label={
                                <>
                                    Type <span className="text-red-500">*</span>
                                </>
                            }
                            select
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                        >
                            <MenuItem value="credit">Credit</MenuItem>
                            <MenuItem value="debit">Debit</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            id="method"
                            name="method"
                            label={
                                <>
                                    Method <span className="text-red-500">*</span>
                                </>
                            }
                            select
                            value={formik.values.method}
                            onChange={formik.handleChange}
                            error={formik.touched.method && Boolean(formik.errors.method)}
                            helperText={formik.touched.method && formik.errors.method}
                        >
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="card">Card</MenuItem>
                            <MenuItem value="upi">Upi</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            id="customerid"
                            name="customerid"
                            label={
                                <>
                                    Customer ID <span className="text-red-500">*</span>
                                </>
                            }
                            value={formik.values.customerid}
                            onChange={formik.handleChange}
                            error={formik.touched.customerid && Boolean(formik.errors.customerid)}
                            helperText={formik.touched.customerid && formik.errors.customerid}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Add Transaction
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddTransaction;