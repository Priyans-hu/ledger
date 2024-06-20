import React from 'react';
import { Typography, Card, CardContent, Button, CardActions } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const Pricing = () => {
    const pricingPlans = [
        {
            title: 'Basic',
            price: '$0',
            features: ['Up to 10 customers', 'Basic expense tracking', 'Email support', 'Basic reporting', 'Community access'],
            buttonLabel: 'Sign Up Now',
        },
        {
            title: 'Professional',
            price: '$15',
            features: ['Up to 50 customers', 'Advanced expense tracking', 'Priority email support', 'Detailed reporting', 'Customizable invoices'],
            buttonLabel: 'Start Now',
            recommended: true,
        },
        {
            title: 'Enterprise',
            price: '$30',
            features: ['Unlimited customers', 'Comprehensive expense management', 'Phone & email support', 'Advanced reporting', 'Dedicated account manager'],
            buttonLabel: 'Join Now',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 mb-16">
            <div className='my-12'>
                <Typography variant="h4" className="text-center mb-8 font-bold text-blue-900">Pricing</Typography>
                <Typography variant="body2" className="text-center mb-8 text-gray-600">
                    Choose a plan that fits your business needs. Ledger offers flexible pricing to suit businesses of all sizes.
                </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {pricingPlans.map((plan, index) => (
                    <Card key={index} className={`shadow-none max-w-sm px-4 py-8 border ${plan.recommended ? 'border-blue-500 scale-105' : 'bg-gray-50'}`}>
                        {plan.recommended && (
                            <Typography variant="body2" className="bg-blue-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl">
                                Recommended
                            </Typography>
                        )}
                        <CardContent>
                            <Typography variant="h6" className="font-bold text-blue-950">{plan.title}</Typography>
                            <Typography variant="h3" className="font-bold my-4 text-blue-900">{plan.price} <span className='text-base font-semibold'>per month</span></Typography>
                            <ul className='list-none p-0 my-4 border-t pt-2'>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-gray-600 my-2 flex items-center">
                                        <CheckIcon className="text-green-500 mr-2" />{feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardActions className="justify-center pb-4">
                            <Button variant="outlined" className="w-5/6 bg-blue-500 hover:bg-blue-600 text-white">{plan.buttonLabel}</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Pricing;