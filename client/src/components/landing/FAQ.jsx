import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqItems = [
        {
            question: 'How do I set up my account on Ledger?',
            answer: 'Setting up is easy! Click the "Get Started" button, enter your store name, phone number, and create a password. You\'ll be up and running in less than a minute.',
        },
        {
            question: 'Can I generate GST and non-GST invoices?',
            answer: 'Yes! Ledger supports both GST and non-GST invoices. You can set your GST number in your profile and choose whether to include GST on each invoice. Tax calculations are done automatically.',
        },
        {
            question: 'How do I track my expenses?',
            answer: 'Simply add transactions from your dashboard. Categorize them as rent, utilities, salary, marketing, or any other category. You\'ll get detailed breakdowns and charts showing where your money goes.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely. We use bank-grade encryption (AES-256) to protect your data. Passwords are hashed using bcrypt, and we have rate limiting to prevent unauthorized access. Your data is never shared with third parties.',
        },
        {
            question: 'Can I export my data?',
            answer: 'Yes! You can export transactions to CSV for spreadsheet analysis, and invoices to beautifully formatted PDF documents. Export reports for any time period with just one click.',
        },
        {
            question: 'Do you offer customer support?',
            answer: 'We offer email support for all users and priority support for Professional and Enterprise plans. Our team typically responds within 24 hours on business days.',
        },
        {
            question: 'Can I use Ledger on my phone?',
            answer: 'Yes! Ledger is fully responsive and works great on phones, tablets, and desktops. Access your business data from anywhere, anytime.',
        },
        {
            question: 'What happens when my trial ends?',
            answer: 'You can continue using the free Starter plan with limited features, or upgrade to Professional or Enterprise for full access. Your data is never deleted.',
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
                        FAQ
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-lg text-slate-600">
                        Everything you need to know about Ledger. Can't find what you're looking for? Contact our support team.
                    </p>
                </div>

                {/* FAQ items */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-slate-50 rounded-2xl overflow-hidden transition-all duration-200"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
                            >
                                <span className="font-semibold text-slate-900 pr-8">
                                    {item.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-200 ${
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">Still have questions?</p>
                    <a
                        href="mailto:support@ledger.app"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                    >
                        Contact our support team
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
