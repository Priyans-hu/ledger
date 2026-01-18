import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import CategoryIcon from '@mui/icons-material/Category';

const Features = () => {
    const features = [
        {
            title: 'Customer Management',
            description: 'Full CRUD operations with search, filter, and pagination. Track customer interactions, purchase history, and total spending.',
            icon: <PersonIcon fontSize="large" />,
        },
        {
            title: 'Transaction Tracking',
            description: 'Record credits and debits with expense categorization. Filter by date, month, or year. Sort and search transactions easily.',
            icon: <AttachMoneyIcon fontSize="large" />,
        },
        {
            title: 'Expense Categories',
            description: 'Categorize expenses into rent, utilities, salary, marketing, and more. Get detailed expense breakdowns and category-wise analytics.',
            icon: <CategoryIcon fontSize="large" />,
        },
        {
            title: 'GST Invoice Generation',
            description: 'Create professional GST-compliant invoices with multiple line items. Add tax rates, discounts, and notes. Track invoice status.',
            icon: <ReceiptIcon fontSize="large" />,
        },
        {
            title: 'PDF Export',
            description: 'Export invoices as beautifully formatted PDF documents. Download transaction reports in CSV format for offline analysis.',
            icon: <PictureAsPdfIcon fontSize="large" />,
        },
        {
            title: 'Dashboard Analytics',
            description: 'Interactive charts showing monthly trends, credit vs debit breakdown. Visual insights with Chart.js powered graphs.',
            icon: <BarChartIcon fontSize="large" />,
        },
        {
            title: 'Data Export',
            description: 'Export transactions to CSV for spreadsheet analysis. Generate reports for any time period with one click.',
            icon: <DownloadIcon fontSize="large" />,
        },
        {
            title: 'Secure Authentication',
            description: 'JWT-based authentication with password hashing. Rate limiting protects against brute force attacks. Profile management included.',
            icon: <LockIcon fontSize="large" />,
        },
        {
            title: 'Modern Dashboard',
            description: 'Clean, responsive interface built with Material-UI. Quick access cards for all operations. Mobile-friendly design.',
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
