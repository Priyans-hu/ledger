import React from 'react';
import { Typography } from '@mui/material';

const SectionHeading = ({ title }) => {
    return (
        <div className='my-16'>
            <Typography variant="h5" className="my-8 font-bold text-left">{title}</Typography>
        </div>
    );
};

export default SectionHeading;
