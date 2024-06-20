import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqItems = [
    {
      question: 'How do I set up my account on Ledger?',
      answer: 'To set up your account, click on the "Sign Up" button on the homepage, enter your details, and follow the instructions to complete the registration process.',
    },
    {
      question: 'Can I generate GST and non-GST invoices using Ledger?',
      answer: 'Yes, Ledger allows you to generate both GST and non-GST invoices. You can select the type of invoice when creating a new bill.',
    },
    {
      question: 'How do I manage my expenses using Ledger?',
      answer: 'Ledger provides a comprehensive expense management feature. You can add, track, and categorize your expenses easily from the dashboard.',
    },
    {
      question: 'Is my data secure on Ledger?',
      answer: 'Yes, we take data security seriously. All your data is encrypted and securely stored. We adhere to industry-standard security practices to ensure your information is safe.',
    },
    {
      question: 'Can I track my sales and profits using Ledger?',
      answer: 'Absolutely. Ledger offers detailed tracking of your sales and profits, including daily, monthly, and weekly reports to help you stay on top of your business performance.',
    },
    {
      question: 'How can I contact Ledger customer support?',
      answer: 'You can reach our customer support team through email, phone, or our online chat service available on the website.',
    },
  ];

  return (
    <div className="container mx-auto px-4 my-12">
      <div className='my-12'>
        <Typography variant="h4" className="text-center my-8 font-bold">Frequently Asked Questions</Typography>
      </div>
      <div className="max-w-5xl mx-auto">
        {faqItems.map((item, index) => (
          <Accordion key={index} className="p-2 border-t duration-300 max-w-5xl mx-auto">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" className="font-bold">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" className="text-gray-600">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default FAQ;