// cards.js
import { MonetizationOn, LibraryBooks } from '@mui/icons-material';

const cards = {
    transactions: [
        {
            title: "Add a Transaction",
            description: "Record a new transaction",
            icon: <MonetizationOn sx={{ fontSize: 50, color: '#4caf50' }} />,
            link: "/add-transaction",
        },
        {
            title: "Manage Transactions",
            description: "View and manage your transactions",
            icon: <LibraryBooks sx={{ fontSize: 50, color: '#ff9800' }} />,
            link: "/manage-transactions",
        }
    ],
    customer: [
        {
            title: "Add a Customer",
            description: "Add a new customer to your records",
            icon: <MonetizationOn sx={{ fontSize: 50, color: '#4caf50' }} />,
            link: "/add-customer",
        },
        {
            title: "View All Customers",
            description: "View and manage all customers",
            icon: <LibraryBooks sx={{ fontSize: 50, color: '#ff9800' }} />,
            link: "/view-customers",
        }
    ]
};

export default cards;
