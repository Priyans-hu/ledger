import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Highlights from '../components/landing/Highlights';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import Hero from '../components/landing/Hero';

function Landing() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Hero />
                <section id="features"><Features /></section>
                <section id="testimonials"><Testimonials /></section>
                <section id="highlights"><Highlights /></section>
                <section id="pricing"><Pricing /></section>
                <section id="faq"><FAQ /></section>
            </main>
            <Footer />
        </div>
    );
}

export default Landing;
