import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const footerLinks = {
        product: [
            { label: 'Features', action: () => scrollToSection('features') },
            { label: 'Pricing', action: () => scrollToSection('pricing') },
            { label: 'Testimonials', action: () => scrollToSection('testimonials') },
            { label: 'FAQ', action: () => scrollToSection('faq') },
        ],
        company: [
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Press', href: '#' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
        ],
    };

    return (
        <footer className="bg-slate-900 text-white">
            {/* CTA Section */}
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Ready to get started?
                            </h3>
                            <p className="text-blue-100">
                                Join thousands of shop owners who are already using Ledger.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                to="/signup"
                                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                to="/login"
                                className="px-6 py-3 bg-blue-500/20 text-white font-semibold rounded-xl border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">Ledger</span>
                        </Link>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            The complete shop management solution. Track customers, manage expenses, generate invoices, and grow your business.
                        </p>
                        {/* Social links */}
                        <div className="flex gap-4">
                            <button type="button" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </button>
                            <button type="button" aria-label="GitHub" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </button>
                            <button type="button" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Product links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={link.action}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm">
                            &copy; {new Date().getFullYear()} Ledger. All rights reserved.
                        </p>
                        <p className="text-slate-400 text-sm">
                            Made with care in India
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
