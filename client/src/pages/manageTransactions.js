import React, { useState, useEffect } from 'react';
import { TextField, Button, TableContainer, Paper, Menu, MenuItem, ListItemText, Select, FormControl, InputLabel } from '@mui/material';
import transactionApi from '../api/transactionApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [date, setDate] = useState('');
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [sortOption, setSortOption] = useState('dateNewToOld');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const defaultMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
        setSelectedMonth(defaultMonth.toString());
        fetchTransactions(defaultMonth);
    }, []);

    const fetchTransactions = async (month) => {
        try {
            const response = await transactionApi.getTransactionsByMonth(month);
            const transactions = response.data.transactions || [];
            setTransactions(transactions);
            calculateMonthlyTotal(transactions);
        } catch (error) {
            toast.error('Failed to fetch transactions');
        }
    };

    const fetchTransactionsByDate = async () => {
        try {
            const response = await transactionApi.getTransactionsByDate(date);
            const transactions = response.data.transactions || [];
            setTransactions(transactions);
            calculateMonthlyTotal(transactions);
        } catch (error) {
            toast.error('Failed to fetch transactions by date');
        }
    };

    const calculateMonthlyTotal = (transactions) => {
        const total = transactions.reduce((acc, transaction) => {
            const amount = parseFloat(transaction.amount);
            return acc + (transaction.type === 'credit' ? amount : -amount);
        }, 0);

        setMonthlyTotal(total.toFixed(2));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSortOption = (option) => {
        setSortOption(option);
        handleSortTransactions(option);
    };

    const handleSortTransactions = (option) => {
        let sortedTransactions = [...transactions];

        switch (option) {
            case 'dateNewToOld':
                sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'dateOldToNew':
                sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'amountHighToLow':
                sortedTransactions.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
                break;
            case 'amountLowToHigh':
                sortedTransactions.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
                break;
            default:
                break;
        }

        setTransactions(sortedTransactions);
    };

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const resetFilters = () => {
        const defaultMonth = new Date().getMonth() + 1;
        setSelectedMonth(defaultMonth.toString());
        fetchTransactions(defaultMonth);
        setDate('');
    };

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
        fetchTransactions(selectedMonth);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto my-16 p-4 min-h-[80vh]">
                <h1 className="text-4xl text-center font-bold mb-8">Manage Transactions</h1>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <FormControl className="mb-4 md:mb-0">
                        <InputLabel id="select-month-label">Select Month</InputLabel>
                        <Select
                            labelId="select-month-label"
                            id="select-month"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="w-full"
                        >
                            {Array.from({ length: new Date().getMonth() + 1 }, (_, index) => index + 1).map((month) => (
                                <MenuItem key={month} value={month.toString()}>
                                    {new Date(new Date().getFullYear(), month - 1, 1).toLocaleString('default', { month: 'long' })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mb-4 md:mb-0"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchTransactionsByDate} // Fix: Added definition for fetchTransactionsByDate
                        className="mb-4 md:mb-0 md:mr-2"
                    >
                        Filter by Date
                    </Button>
                    {date && (
                        <Button variant="contained" onClick={resetFilters} className="mb-4 md:mb-0 md:mr-2">
                            Reset Filters
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        aria-controls="sort-menu"
                        aria-haspopup="true"
                        onClick={openMenu}
                    >
                        Sort By
                    </Button>
                    <Menu
                        id="sort-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem onClick={() => handleSortOption('dateNewToOld')}>
                            <ListItemText primary="Date: New to Old" />
                        </MenuItem>
                        <MenuItem onClick={() => handleSortOption('dateOldToNew')}>
                            <ListItemText primary="Date: Old to New" />
                        </MenuItem>
                        <MenuItem onClick={() => handleSortOption('amountHighToLow')}>
                            <ListItemText primary="Amount: High to Low" />
                        </MenuItem>
                        <MenuItem onClick={() => handleSortOption('amountLowToHigh')}>
                            <ListItemText primary="Amount: Low to High" />
                        </MenuItem>
                    </Menu>
                </div>
                <TableContainer component={Paper} className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr>
                                <td className="px-6 py-3 text-left font-bold">Serial No</td>
                                <td className="px-6 py-3 text-left font-bold">Amount</td>
                                <td className="px-6 py-3 text-left font-bold">Description</td>
                                <td className="px-6 py-3 text-left font-bold">Date</td>
                                <td className="px-6 py-3 text-left font-bold">Type</td>
                                <td className="px-6 py-3 text-left font-bold">Method</td>
                                <td className="px-6 py-3 text-left font-bold">Customer ID</td>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        No transactions available
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((transaction, index) => (
                                    <tr key={transaction.transactionid}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap" style={{ color: transaction.type === 'credit' ? 'green' : 'red' }}>{transaction.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{transaction.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(transaction.date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{transaction.method}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{transaction.customerid || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </TableContainer>
                <div className="flex justify-end mt-4">
                    <h2 className="text-2xl font-bold">Monthly Total: {monthlyTotal}</h2>
                </div>
                <div className="flex justify-end mt-4">
                    <Link to="/add-transaction">
                        <Button variant="contained" color="secondary">
                            Add Transaction
                        </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ManageTransactions;