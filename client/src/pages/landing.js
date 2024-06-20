import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import { Divider } from '@mui/material';
import Hero from '../components/Hero';

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
