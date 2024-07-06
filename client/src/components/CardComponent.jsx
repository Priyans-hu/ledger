import React from 'react';
import { Paper, Typography } from '@mui/material';

const CardComponent = ({ card, onClick }) => {
    return (
        <Paper
            className="p-6 text-left hover:shadow-lg transition duration-300 ease-in-out w-full md:max-w-sm mx-auto cursor-pointer my-4 md:my-auto"
            onClick={() => onClick(card.link)}
        >
            <div className='flex'>
                <div className='flex items-center justify-center mx-4'>
                    <div className="text-gray-400 m-2">{card.icon}</div>
                </div>
                <div>
                    <Typography variant="h6" className="text-black font-bold mt-4 mb-2">{card.title}</Typography>
                    <Typography variant="body2" className="text-gray-600">{card.description}</Typography>
                </div>
            </div>
        </Paper>
    );
};

export default CardComponent;