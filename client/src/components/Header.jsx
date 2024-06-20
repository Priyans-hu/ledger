import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };

    return (
        <AppBar position="static" className="bg-white shadow-md">
            <Toolbar className="container mx-auto flex justify-between">
                <div className="flex items-center">
                    <Typography variant="h6" className="text-white font-extrabold">Ledger</Typography>
                </div>
                <div className='hidden lg:flex mx-4'>
                    <Button color="inherit" className="text-gray-400" onClick={() => scrollToSection('features')}>Features</Button>
                    <Button color="inherit" className="text-gray-400" onClick={() => scrollToSection('testimonials')}>Testimonials</Button>
                    <Button color="inherit" className="text-gray-400" onClick={() => scrollToSection('highlights')}>Highlights</Button>
                    <Button color="inherit" className="text-gray-400" onClick={() => scrollToSection('pricing')}>Pricing</Button>
                    <Button color="inherit" className="text-gray-400" onClick={() => scrollToSection('faq')}>FAQ</Button>
                </div>
                <div className="hidden lg:flex">
                    <Button color="inherit" className="text-blue-900">Sign In</Button>
                    <Button variant="outlined" color="inherit" className="text-blue-900 border-blue-900 mx-4">Sign Up</Button>
                </div>
                <div className="lg:hidden">
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                        <List>
                            <ListItem component="button" onClick={() => { scrollToSection('features') }}>Features</ListItem>
                            <ListItem component="button" onClick={() => { scrollToSection('testimonials') }}>Testimonials</ListItem>
                            <ListItem component="button" onClick={() => { scrollToSection('highlights') }}>Highlights</ListItem>
                            <ListItem component="button" onClick={() => { scrollToSection('pricing') }}>Pricing</ListItem>
                            <ListItem component="button" onClick={() => { scrollToSection('faq') }}>FAQ</ListItem>
                            <ListItem component="button" onClick={() => { scrollToSection('signin') }}>Sign In</ListItem>
                            <ListItem component="button" onClick={() => { scrollToSection('signup') }}>Sign Up</ListItem>
                        </List>
                    </Drawer>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;