import React from 'react';
import { Typography, Link, Container, Grid, TextField, Button, Divider } from '@mui/material';
import { GitHub, X, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <>
            <Divider />
            <footer className='py-16 mt-16 bg-white'>
                <Container maxWidth='lg'>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6' className='text-black'>Ledger</Typography>
                            <Typography variant='body2' className='text-gray-400 mt-2'>
                                Subscribe to our newsletter for updates and promotions.
                            </Typography>
                            <div className='mt-4 flex'>
                                <TextField variant='outlined' size='small' placeholder='Your email address' className='flex-grow mr-2' />
                                <Button variant='contained' color='primary' className='mx-4'>Subscribe</Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='flex justify-end'>
                                <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto'>
                                    <div>
                                        <Typography variant='button' className='text-black'>Main Links</Typography>
                                        <ul className='list-none p-0 mt-2 space-y-2'>
                                            <li>
                                                <Link href='/dashboard' className='text-gray-400 hover:text-black'>Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link href='/customers' className='text-gray-400 hover:text-black'>Customers</Link>
                                            </li>
                                            <li>
                                                <Link href='/transactions' className='text-gray-400 hover:text-black'>Transactions</Link>
                                            </li>
                                            <li>
                                                <Link href='/generate-invoice' className='text-gray-400 hover:text-black'>Generate Invoice</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <Typography variant='button' className='text-black'>Company</Typography>
                                        <ul className='list-none p-0 mt-2 space-y-2'>
                                            <li>
                                                <Link href='#' className='text-gray-400 hover:text-black'>About Us</Link>
                                            </li>
                                            <li>
                                                <Link href='#' className='text-gray-400 hover:text-black'>Careers</Link>
                                            </li>
                                            <li>
                                                <Link href='#' className='text-gray-400 hover:text-black'>Press</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <Typography variant='button' className='text-black'>Legal</Typography>
                                        <ul className='list-none p-0 mt-2 space-y-2'>
                                            <li>
                                                <Link href='#' className='text-gray-400 hover:text-black'>Privacy Policy</Link>
                                            </li>
                                            <li>
                                                <Link href='#' className='text-gray-400 hover:text-black'>Terms of Service</Link>
                                            </li>
                                            <li>
                                                <Link href='#' className='text-gray-400 hover:text-black'>Contact</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <div className='flex justify-between items-center border-t mt-8 pt-8'>
                        <div>
                            <Typography variant='body2' className='text-gray-400'>
                                Privacy Policy • Terms of Service
                            </Typography>
                            <Typography variant='body2' className='text-gray-400 mt-1'>
                                &copy; {new Date().getFullYear()} Ledger. All rights reserved.
                            </Typography>
                        </div>
                        <div className='flex space-x-4 mt-2'>
                            <Link href='https://github.com/' color='inherit' target='_blank'>
                                <GitHub className='text-gray-400 hover:text-black' />
                            </Link>
                            <Link href='#' color='inherit'>
                                <X className='text-gray-400 hover:text-black' />
                            </Link>
                            <Link href='https://www.linkedin.com/' color='inherit' target='_blank'>
                                <LinkedIn className='text-gray-400 hover:text-black' />
                            </Link>
                        </div>
                    </div>
                </Container>
            </footer>
        </>
    );
}

export default Footer;