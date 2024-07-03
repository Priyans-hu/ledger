import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Highlights from '../components/landing/Highlights';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import { Divider } from '@mui/material';
import Hero from '../components/landing/Hero';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className=""><Hero /></section>
                <section className="py-16 px-4" id='features'><Features /></section>
                <Divider/>
                <section className="bg-gray-100 py-16 px-4" id='testimonials'><Testimonials /></section>
                <Divider/>
                <section className="bg-gray-950 text-white py-16 px-4" id='highlights'><Highlights /></section>
                <Divider/>
                <section className="py-16 px-4" id='pricing'><Pricing /></section>
                <Divider/>
                <section className="py-16 px-4" id='faq'><FAQ /></section>
                <Divider/>
            </main>
            <Footer />
        </div>
    );
}

export default App;
