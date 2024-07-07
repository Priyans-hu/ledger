import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Paper, Box, Select, MenuItem } from '@mui/material';
import { MonetizationOn, LibraryBooks } from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Footer from '../components/Footer';
import Header from '../components/Header';
import transactionApi from '../api/transactionApi';
import cards from '../content/cards';
import CardComponent from '../components/CardComponent';
import SectionHeading from '../components/SectionHeading';
import { filterByThisMonth, filterByLastMonth, filterByLast90Days, filterByThisYear, calculateDebitTotal, calculateCreditTotal } from '../helpers/transactionFilters';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    
    useEffect(() => {
        fetchTransactionMetrics(selectedPeriod);
        fetchMonthlyTransactions();
    }, [selectedPeriod]);

    const fetchTransactionMetrics = async (period) => {
        try {
            const response = await transactionApi.getAllTransactions();
            const transactions = response.data.transactions || [];

            let filteredTransactions = transactions;

            switch (period) {
                case 'thisMonth':
                    filteredTransactions = filterByThisMonth(transactions);
                    break;
                case 'lastMonth':
                    filteredTransactions = filterByLastMonth(transactions);
                    break;
                case 'last90Days':
                    filteredTransactions = filterByLast90Days(transactions);
                    break;
                case 'thisYear':
                    filteredTransactions = filterByThisYear(transactions);
                    break;
                default:
                    break;
            }

            const debitTotal = calculateDebitTotal(filteredTransactions);
            const creditTotal = calculateCreditTotal(filteredTransactions);

            setTotalTransactions(filteredTransactions.length);
            setTotalDebit(debitTotal.toFixed(2));
            setTotalCredit(creditTotal.toFixed(2));
        } catch (error) {
            console.error('Failed to fetch transaction metrics', error);
        }
    };

    const fetchMonthlyTransactions = async () => {
        try {
            const response = await transactionApi.getMonthlyTransactions(); // Assuming this API endpoint exists
            setMonthlyTransactions(response.data.monthlyTransactions || []);
        } catch (error) {
            console.error('Failed to fetch monthly transactions', error);
        }
    };

    const handleNavigation = (link) => {
        navigate(link);
    };

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const barData = {
        labels: monthlyTransactions.map((month) => month.name),
        datasets: [
            {
                label: 'Number of Transactions',
                data: monthlyTransactions.map((month) => month.transactionCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Debit', 'Credit'],
        datasets: [
            {
                data: [totalDebit, totalCredit],
                backgroundColor: ['#ff9800', '#4caf50'],
                hoverBackgroundColor: ['#ffa726', '#66bb6a'],
            },
        ],
    };

    return (
        <>
            <Header />
            <div className='min-h-[80vh]'>
                <Container maxWidth="md" className="text-center my-16">
                    <div className='my-16'>
                        <Typography variant="h3" className="my-12 font-bold">Dashboard</Typography>
                    </div>

                    {/* Transaction Metrics */}
                    <div className='flex items-center justify-between'>
                        <Typography variant="h5" className="my-8 font-bold text-left">Transaction Metrics</Typography>
                        {/* Period Selector */}
                        <Select
                            value={selectedPeriod}
                            onChange={handlePeriodChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select period' }}
                        >
                            <MenuItem value="thisMonth">This Month</MenuItem>
                            <MenuItem value="lastMonth">Last Month</MenuItem>
                            <MenuItem value="last90Days">Last 90 Days</MenuItem>
                            <MenuItem value="thisYear">This Year</MenuItem>
                        </Select>
                    </div>
                    <div className="flex flex-col md:flex-row mt-8 mb-16">
                        {/* Total Transactions */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Paper className="p-6 text-left hover:shadow-lg transition duration-300 ease-in-out w-full md:max-w-sm mx-auto cursor-pointer my-4 md:my-auto">
                                <div className='flex'>
                                    <div className='flex items-center justify-center mx-4'>
                                        <div className="text-gray-400 m-2"><MonetizationOn sx={{ fontSize: 50, color: '#4caf50' }} /></div>
                                    </div>
                                    <div>
                                        <Typography variant="h6" className="text-black font-bold mt-4 mb-2">Total Transactions</Typography>
                                        <Typography variant="body2" className="text-gray-600">{totalTransactions}</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Box>

                        {/* Total Debit */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Paper className="p-6 text-left hover:shadow-lg transition duration-300 ease-in-out w-full md:max-w-sm mx-auto cursor-pointer my-4 md:my-auto">
                                <div className='flex'>
                                    <div className='flex items-center justify-center mx-4'>
                                        <div className="text-gray-400 m-2"><LibraryBooks sx={{ fontSize: 50, color: '#ff9800' }} /></div>
                                    </div>
                                    <div>
                                        <Typography variant="h6" className="text-black font-bold mt-4 mb-2">Total Debit</Typography>
                                        <Typography variant="body2" className="text-gray-600">₹ {totalDebit}</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Box>

                        {/* Total Credit */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Paper className="p-6 text-left hover:shadow-lg transition duration-300 ease-in-out w-full md:max-w-sm mx-auto cursor-pointer my-4 md:my-auto">
                                <div className='flex'>
                                    <div className='flex items-center justify-center mx-4'>
                                        <div className="text-gray-400 m-2"><MonetizationOn sx={{ fontSize: 50, color: '#4caf50' }} /></div>
                                    </div>
                                    <div>
                                        <Typography variant="h6" className="text-black font-bold mt-4 mb-2">Total Credit</Typography>
                                        <Typography variant="body2" className="text-gray-600">₹ {totalCredit}</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Box>
                    </div>

                    {/* Bar Chart for Number of Transactions */}
                    <div className='my-8'>
                        <Typography variant="h5" className="my-8 font-bold text-left">Transactions Over the Past 12 Months</Typography>
                        <Bar data={barData} options={{ responsive: true }} />
                    </div>

                    {/* Pie Chart for Credit and Debit */}
                    <div className='my-8'>
                        <Typography variant="h5" className="my-8 font-bold text-left">Credit vs Debit</Typography>
                        <Pie data={pieData} options={{ responsive: true }} />
                    </div>

                    {/* Transactions Cards */}
                    <SectionHeading title="Transactions" />
                    <div className="flex flex-col md:flex-row mt-8 mb-16">
                        {cards.transactions.map((card, index) => (
                            <CardComponent key={index} card={card} onClick={handleNavigation} />
                        ))}
                    </div>

                    {/* Customer Cards */}
                    <SectionHeading title="Customer" />
                    <div className="flex flex-col md:flex-row mt-8 mb-16">
                        {cards.customer.map((card, index) => (
                            <CardComponent key={index} card={card} onClick={handleNavigation} />
                        ))}
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
