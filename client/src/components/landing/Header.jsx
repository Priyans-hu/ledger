import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const navItems = [
        { label: 'Features', id: 'features' },
        { label: 'Testimonials', id: 'testimonials' },
        { label: 'Highlights', id: 'highlights' },
        { label: 'Pricing', id: 'pricing' },
        { label: 'FAQ', id: 'faq' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50'
                : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center`}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                            Ledger
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    isScrolled
                                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            to="/login"
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                isScrolled
                                    ? 'text-slate-600 hover:text-slate-900'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                                isScrolled
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                                    : 'bg-white text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg
                            className={`w-6 h-6 transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
                mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="bg-white border-t border-slate-200 shadow-lg">
                    <div className="px-4 py-4 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
                            <Link
                                to="/login"
                                className="block w-full text-center px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
