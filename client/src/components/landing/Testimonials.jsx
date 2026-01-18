import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Owner',
            company: 'Kumar Electronics',
            testimonial: 'Ledger has transformed how I manage my electronics shop. The GST invoice feature alone saves me hours every week. Highly recommended for any small business!',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
        },
        {
            name: 'Priya Sharma',
            role: 'Manager',
            company: 'Fashion Hub',
            testimonial: 'The expense tracking and analytics dashboard give me complete visibility into my business. I can now make data-driven decisions with confidence.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
        },
        {
            name: 'Mohammed Ali',
            role: 'Proprietor',
            company: 'Ali General Store',
            testimonial: 'Simple, intuitive, and powerful. Managing customers and tracking payments has never been easier. The PDF export feature is a game-changer.',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            rating: 5,
        },
        {
            name: 'Sunita Patel',
            role: 'Owner',
            company: 'Patel Textiles',
            testimonial: 'We switched from manual ledgers to this app and saw immediate improvements. The customer management system is exactly what we needed.',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            rating: 5,
        },
        {
            name: 'Vikram Singh',
            role: 'CEO',
            company: 'Singh Enterprises',
            testimonial: 'The dashboard analytics help me understand my business better. Monthly reports, expense breakdowns - everything I need in one place.',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
        },
        {
            name: 'Anita Desai',
            role: 'Director',
            company: 'Desai Pharma',
            testimonial: 'Excellent product with great customer support. The secure authentication and data protection features give me peace of mind.',
            avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
            rating: 5,
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                        Testimonials
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Loved by shop owners everywhere
                    </h2>
                    <p className="text-lg text-slate-600">
                        See what our customers say about how Ledger has helped them streamline their business operations.
                    </p>
                </div>

                {/* Testimonials grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-colors duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                "{testimonial.testimonial}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                                    <div className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
