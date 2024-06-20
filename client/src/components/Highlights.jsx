import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import BuildIcon from '@mui/icons-material/Build';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const Highlights = () => {
    const highlights = [
        {
            title: 'Advanced Performance',
            description: 'Optimize every aspect of your finances, boosting efficiency and simplifying your tasks.',
            icon: <SpeedIcon fontSize='medium' />,
        },
        {
            title: 'Built to Last',
            description: 'Experience reliability and durability like never before, with robust and lasting components.',
            icon: <BuildIcon fontSize='medium' />,
        },
        {
            title: 'Great User Experience',
            description: 'Enjoy an intuitive interface that makes it easy to navigate and utilize all features.',
            icon: <ThumbUpIcon fontSize='medium' />,
        },
        {
            title: 'Innovative Functionality',
            description: 'Stay ahead with the latest features, ensuring your evolving needs are met.',
            icon: <LightbulbIcon fontSize='medium' />,
        },
        {
            title: 'Reliable Support',
            description: 'Count on our expert customer support, ensuring assistance that goes beyond the purchase.',
            icon: <SupportAgentIcon fontSize='medium' />,
        },
        {
            title: 'Precision in Every Detail',
            description: 'Every detail has a significant impact on your overall experience, ensuring high quality.',
            icon: <PrecisionManufacturingIcon fontSize='medium' />,
        },
    ];

    return (
        <div className='container mx-auto px-4'>
            <div className='my-12'>
                <Typography variant='h4' className='text-center mb-2 font-bold text-white'>Highlights</Typography>
                <p variant='body1' className='text-center mt-4 mx-auto mb-8 w-2/3 text-gray-200'>
                    Explore why our product stands out: adaptability, durability, user-friendly design, and innovation.
                    Enjoy reliable customer support and precision in every detail.
                </p>
            </div>
            <div className='lg:w-3/4 lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {highlights.map((highlight, index) => (
                    <Card key={index} className='text-white border border-slate-200 border-opacity-5 max-w-xl' style={{ backgroundColor: 'transparent' }}>
                        <CardContent className='flex flex-col text-left'>
                            <span className='text-gray-400 my-2'>{highlight.icon}</span>
                            <Typography variant='h6' className='text-white font-bold mt-2 mb-2'>{highlight.title}</Typography>
                            <span className='m-1'></span>
                            <Typography variant='body2' className='text-gray-400'>{highlight.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Highlights;