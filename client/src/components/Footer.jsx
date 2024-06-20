import React from 'react';
import { Typography, Link, Container, Grid, TextField, Button } from '@mui/material';
import { GitHub, X, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer className='py-16 mt-16 bg-white'>
            <Container maxWidth='lg'>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Typography variant='h6' className='text-black'>Ledger</Typography>
                        <Typography variant='body2' className='text-gray-400 mt-2'>
                            Subscribe to our newsletter for weekly updates and promotions.
                        </Typography>
                        <div className='mt-4 flex'>
                            <TextField variant='outlined' size='small' placeholder='Your email address' className='flex-grow mr-2' />
                            <Button variant='contained' color='primary' className='mx-4'>Subscribe</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <div className='flex flex-wrap justify-end'>
                            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto'>
                                <div>
                                    <Typography variant='button' className='text-black'>Product</Typography>
                                    <ul className='list-none p-0 mt-2 space-y-2'>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>Features</Link>
                                        </li>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>Testimonials</Link>
                                        </li>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>Highlights</Link>
                                        </li>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>Pricing</Link>
                                        </li>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>FAQs</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <Typography variant='button' className='text-black'>Company</Typography>
                                    <ul className='list-none p-0 mt-2 space-y-2'>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>About us</Link>
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
                                            <Link href='#' className='text-gray-400 hover:text-black'>Terms</Link>
                                        </li>
                                        <li>
                                            <Link href='#' className='text-gray-400 hover:text-black'>Privacy</Link>
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
                        <Link href='#' color='inherit'>
                            <GitHub className='text-gray-400 hover:text-black' />
                        </Link>
                        <Link href='#' color='inherit'>
                            <X className='text-gray-400 hover:text-black' />
                        </Link>
                        <Link href='#' color='inherit'>
                            <LinkedIn className='text-gray-400 hover:text-black' />
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;