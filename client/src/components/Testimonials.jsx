import React from 'react';
import { Typography, Avatar, Grid, Paper } from '@mui/material';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Kerry Zhang',
      role: 'Senior Engineer',
      company: 'Sydel',
      testimonial: 'I especially value how well the product allows me to handle finances. It provides key insights into where my money is going, helping me manage my budget more efficiently.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Travis Howard',
      role: 'Lead Product Designer',
      company: 'Bern',
      testimonial: 'One of the standout features of this product is how it allows me to automate expenses. I no longer have to worry about manual entry, and it has saved me hours of work every month.',
      avatar: 'https://randomuser.me/api/portraits/men/79.jpg',
    },
    {
      name: 'Cindy Baker',
      role: 'CTO',
      company: 'MyTreveal',
      testimonial: 'The level of agility and user-friendliness in this product is exceptional. Simplifying the way I manage finances, it’s now easier than ever to keep track of where my money goes.',
      avatar: 'https://randomuser.me/api/portraits/women/80.jpg',
    },
    {
      name: 'James Watson',
      role: 'CEO',
      company: 'Techify',
      testimonial: 'This product has revolutionized the way we manage our finances. The automation features save us time and the reporting tools provide valuable insights.',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    },
    {
      name: 'Alice Johnson',
      role: 'CFO',
      company: 'FinanceCorp',
      testimonial: 'The user-friendly interface and robust features make it easy to manage our company’s finances. The customer support is also excellent.',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      name: 'Michael Lee',
      role: 'Manager',
      company: 'BizSolutions',
      testimonial: 'We have been able to streamline our financial processes and improve efficiency thanks to this product. Highly recommend it to any business.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <div className='my-12'>
        <Typography variant="h4" className="text-center mb-8 font-bold text-blue-900">Testimonials</Typography>
        <Typography variant="body2" className="text-center mb-8 text-gray-600">
          See what our customers love about our products. Discover how we excel in efficiency, durability,
          and satisfaction. Join us for quality, innovation, and reliable support.
        </Typography>
      </div>
      <Grid container spacing={4} className='w-2/3 mx-auto'>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper className="p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Avatar alt={testimonial.name} src={testimonial.avatar} className="mr-4" />
                <div>
                  <Typography variant="body1" className="font-bold text-blue-900">{testimonial.name}</Typography>
                  <Typography variant="body2" className="text-gray-600">{testimonial.role}, {testimonial.company}</Typography>
                </div>
              </div>
              <Typography variant="body2" className="text-gray-600">{testimonial.testimonial}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Testimonials;