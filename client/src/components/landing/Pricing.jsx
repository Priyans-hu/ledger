import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const pricingPlans = [
        {
            title: 'Starter',
            description: 'Perfect for small shops just getting started',
            price: 'Free',
            period: 'forever',
            features: [
                'Up to 50 customers',
                'Basic expense tracking',
                '10 invoices per month',
                'Email support',
                'Basic reports',
            ],
            buttonLabel: 'Start Free',
            buttonLink: '/signup',
            highlighted: false,
        },
        {
            title: 'Professional',
            description: 'For growing businesses that need more',
            price: 'Rs 499',
            period: '/month',
            features: [
                'Unlimited customers',
                'Advanced expense tracking',
                'Unlimited invoices',
                'Priority support',
                'Advanced analytics',
                'PDF export',
                'Data backup',
            ],
            buttonLabel: 'Start Trial',
            buttonLink: '/signup',
            highlighted: true,
            badge: 'Most Popular',
        },
        {
            title: 'Enterprise',
            description: 'For large businesses with custom needs',
            price: 'Rs 999',
            period: '/month',
            features: [
                'Everything in Professional',
                'Multiple stores',
                'Team management',
                'API access',
                'Custom integrations',
                'Dedicated support',
                'Custom reports',
            ],
            buttonLabel: 'Contact Sales',
            buttonLink: '/signup',
            highlighted: false,
        },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                        Pricing
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-slate-600">
                        Choose the plan that fits your business. Start free, upgrade when you're ready.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 ${
                                plan.highlighted
                                    ? 'bg-slate-900 text-white ring-4 ring-blue-500/50 scale-105'
                                    : 'bg-white border border-slate-200'
                            }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                                    {plan.title}
                                </h3>
                                <p className={`text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                                    {plan.price}
                                </span>
                                <span className={`text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <svg
                                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                                plan.highlighted ? 'text-blue-400' : 'text-green-500'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={`text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={plan.buttonLink}
                                className={`block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
                                    plan.highlighted
                                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                }`}
                            >
                                {plan.buttonLabel}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Trust note */}
                <p className="text-center text-slate-500 text-sm mt-12">
                    All plans include a 14-day free trial. No credit card required.
                </p>
            </div>
        </section>
    );
}

export default Pricing;
