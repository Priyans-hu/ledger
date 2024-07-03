import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';

const Features = () => {
    const features = [
        {
            title: 'Customer Management',
            description: 'Manage your customers efficiently and keep track of all interactions. Easily update contact details, transaction history, and customer notes.',
            icon: <PersonIcon fontSize="large" />,
        },
        {
            title: 'Expense Management',
            description: 'Track your expenses and income with ease and accuracy. Categorize expenditures, set budgets, and generate reports to monitor financial health.',
            icon: <AttachMoneyIcon fontSize="large" />,
        },
        {
            title: 'Profit Tracking',
            description: 'Monitor your daily, monthly, and weekly profits to stay on top of your business. Gain insights with visual analytics and detailed profit and loss statements.',
            icon: <BarChartIcon fontSize="large" />,
        },
        {
            title: 'Secure Authentication',
            description: 'Ensure your data is secure with robust user authentication. Multi-factor authentication and encrypted data storage keep your information safe.',
            icon: <LockIcon fontSize="large" />,
        },
        {
            title: 'Invoice Generation',
            description: 'Generate detailed GST and non-GST invoices and bills. Customize invoice templates, automate billing processes, and send invoices directly to customers.',
            icon: <ReceiptIcon fontSize="large" />,
        },
        {
            title: 'Dashboard Analytics',
            description: 'Get a comprehensive overview of your sales and performance. Interactive dashboards provide real-time data on sales, expenses, and profitability.',
            icon: <DashboardIcon fontSize="large" />,
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <div className='my-12'>
                <Typography variant="h4" className="text-center mb-8 font-bold">Product Features</Typography>
                <p className='text-center my-4'>Discover the powerful features that make Ledger your perfect financial management tool.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="shadow-md border max-w-96 mx-auto p-4">
                        <CardContent className="text-center">
                            <div className="flex flex-col items-center justify-between text-blue-800 mb-4">
                                <span className='mb-2'>{feature.icon}</span>
                                <Typography variant="h6" className="font-bold mb-2">{feature.title}</Typography>
                            </div>
                            <Typography variant="body1" className="text-gray-600">{feature.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Features;
