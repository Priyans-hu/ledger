import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Paper } from '@mui/material';
import { AddCircleOutline, ListAlt, MonetizationOn, LibraryBooks } from '@mui/icons-material';
import Footer from '../components/Footer';
import Header from '../components/Header';

const cards = {
    customer: [
        {
            icon: <ListAlt sx={{ fontSize: 50, color: '#f50057' }} />,
            title: 'View All Customers',
            description: 'View a list of all customers in your ledger.',
            link: '/view-customers'
        },
        {
            icon: <AddCircleOutline sx={{ fontSize: 50, color: '#3f51b5' }} />,
            title: 'Add a Customer',
            description: 'Click here to add a new customer to your ledger.',
            link: '/add-customer'
        }
    ],
    transactions: [
        {
            icon: <LibraryBooks sx={{ fontSize: 50, color: '#ff9800' }} />,
            title: 'Manage My Transactions',
            description: 'Manage and view all your transactions.',
            link: '/manage-transactions'
        },
        {
            icon: <MonetizationOn sx={{ fontSize: 50, color: '#4caf50' }} />,
            title: 'Add Transaction',
            description: 'Add a new transaction to your ledger.',
            link: '/add-transaction'
        }
    ]
};

const Dashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (link) => {
        navigate(link);
    };

    return (
        <>
            <Header />
            <div className='min-h-[80vh]'>
                <Container maxWidth="md" className="text-center my-16">
                    <Typography variant="h3" className="my-12 font-bold">Dashboard</Typography>
                    
                    <Typography variant="h5" className="my-8 font-bold text-left">Customer</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {cards.customer.map((card, index) => (
                            <Paper
                                key={index}
                                className="p-6 text-center hover:shadow-lg transition duration-300 ease-in-out max-w-xs w-full md:max-w-md mx-auto cursor-pointer"
                                onClick={() => handleNavigation(card.link)}
                            >
                                <div className="text-gray-400 my-2">{card.icon}</div>
                                <Typography variant="h6" className="text-black font-bold mt-4 mb-2">{card.title}</Typography>
                                <Typography variant="body2" className="text-gray-600">{card.description}</Typography>
                            </Paper>
                        ))}
                    </div>

                    <Typography variant="h5" className="my-8 font-bold text-left">Transactions</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.transactions.map((card, index) => (
                            <Paper
                                key={index}
                                className="p-6 text-center hover:shadow-lg transition duration-300 ease-in-out max-w-xs w-full md:max-w-md mx-auto cursor-pointer"
                                onClick={() => handleNavigation(card.link)}
                            >
                                <div className="text-gray-400 my-2">{card.icon}</div>
                                <Typography variant="h6" className="text-black font-bold mt-4 mb-2">{card.title}</Typography>
                                <Typography variant="body2" className="text-gray-600">{card.description}</Typography>
                            </Paper>
                        ))}
                    </div>
                </Container>
                <Typography variant="body2" className="mt-8 text-center text-gray-500">More features coming soon! Stay tuned for updates.</Typography>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;