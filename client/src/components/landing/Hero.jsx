import React from 'react';
import landing_image from '../../images/landing.webp';

const Hero = () => {
    return (
        <section className="text-center py-16 bg-gradient-to-b from-blue-100 to-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    <div className="lg:w-1/2 my-12 mx-auto">
                        <h1 className="text-5xl font-extrabold text-blue-900">Welcome to Ledger</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto lg:mx-0">
                            Your comprehensive solution for managing customers, tracking expenses, and generating detailed invoices.
                            Elevate your business with our top-tier features and services.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="p-3 border border-gray-300 rounded-l-md w-64"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                                Start now
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-10 flex justify-center mx-auto">
                        <img
                            src={landing_image}
                            alt="Ledger Dashboard"
                            className="w-full max-w-6xl rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;