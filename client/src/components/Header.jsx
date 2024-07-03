import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Hidden from '@mui/material/Hidden';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleLogout = () => {
        // Your logout logic here
        console.log('Logout clicked');
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setOpenDrawer(false);
    };

    return (
        <AppBar position="static" className="bg-white shadow-md">
            <Toolbar className="container mx-auto flex justify-between">
                <div className="flex items-center">
                    <Typography variant="h6" className="text-white font-extrabold">
                        Ledger
                    </Typography>
                </div>
                <Hidden mdUp>
                    <IconButton edge="end" color="inherit" onClick={toggleDrawer} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                        <List>
                            <ListItem button onClick={() => scrollToSection('dashboard')}>
                                Dashboard
                            </ListItem>
                            <ListItem button onClick={() => scrollToSection('customers')}>
                                Customers
                            </ListItem>
                            <ListItem button onClick={() => scrollToSection('transactions')}>
                                Transactions
                            </ListItem>
                            <ListItem button onClick={() => scrollToSection('generate-invoice')}>
                                Generate Invoice
                            </ListItem>
                            <ListItem component={Link} to="/profile" onClick={() => setOpenDrawer(false)}>
                                <AccountCircleIcon className="mr-2" />
                                Profile
                            </ListItem>
                            <ListItem button onClick={handleLogout}>
                                Logout
                            </ListItem>
                        </List>
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <div className="hidden lg:flex space-x-6">
                        <Button color="inherit" className="text-gray-600" onClick={() => scrollToSection('dashboard')}>
                            Dashboard
                        </Button>
                        <Button color="inherit" className="text-gray-600" onClick={() => scrollToSection('customers')}>
                            Customers
                        </Button>
                        <Button color="inherit" className="text-gray-600" onClick={() => scrollToSection('transactions')}>
                            Transactions
                        </Button>
                        <Button color="inherit" className="text-gray-600" onClick={() => scrollToSection('generate-invoice')}>
                            Generate Invoice
                        </Button>
                    </div>
                    <div className="hidden lg:flex items-center">
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

export default Header;