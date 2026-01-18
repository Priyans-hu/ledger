import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const EXPENSE_CATEGORIES = [
  { value: 'none', label: 'None' },
  { value: 'rent', label: 'Rent' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'supplies', label: 'Supplies' },
  { value: 'salary', label: 'Salary' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'transport', label: 'Transport' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'other', label: 'Other' }
];

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'neft', label: 'NEFT' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'card', label: 'Card' }
];

const validationSchema = Yup.object({
  amount: Yup.number()
    .min(0.01, 'Amount must be greater than 0')
    .required('Amount is required'),
  type: Yup.string()
    .oneOf(['credit', 'debit'], 'Invalid type')
    .required('Type is required'),
  method: Yup.string()
    .oneOf(['cash', 'upi', 'neft', 'cheque', 'card'], 'Invalid method')
    .required('Payment method is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string().max(500, 'Description must be less than 500 characters'),
  category: Yup.string()
});

const TransactionModal = ({
  open,
  onClose,
  onSubmit,
  transaction = null,
  title = 'Add Transaction'
}) => {
  const initialValues = {
    amount: transaction?.amount || '',
    type: transaction?.type || 'credit',
    method: transaction?.method || 'cash',
    date: transaction?.date
      ? new Date(transaction.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    description: transaction?.description || '',
    category: transaction?.category || 'none',
    customerId: transaction?.customerId || ''
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit({
            ...values,
            amount: parseFloat(values.amount),
            customerId: values.customerId || null
          });
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Field
                  as={TextField}
                  name="amount"
                  label="Amount (₹)"
                  type="number"
                  fullWidth
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  inputProps={{ min: 0.01, step: 0.01 }}
                  data-testid="transaction-modal-amount-input"
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl fullWidth error={touched.type && Boolean(errors.type)}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={values.type}
                      label="Type"
                      onChange={(e) => setFieldValue('type', e.target.value)}
                      data-testid="transaction-modal-type-select"
                    >
                      <MenuItem value="credit">Credit (Income)</MenuItem>
                      <MenuItem value="debit">Debit (Expense)</MenuItem>
                    </Select>
                    {touched.type && errors.type && (
                      <FormHelperText>{errors.type}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth error={touched.method && Boolean(errors.method)}>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      name="method"
                      value={values.method}
                      label="Payment Method"
                      onChange={(e) => setFieldValue('method', e.target.value)}
                      data-testid="transaction-modal-method-select"
                    >
                      {PAYMENT_METHODS.map((m) => (
                        <MenuItem key={m.value} value={m.value}>
                          {m.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.method && errors.method && (
                      <FormHelperText>{errors.method}</FormHelperText>
                    )}
                  </FormControl>
                </Box>

                <Field
                  as={TextField}
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  data-testid="transaction-modal-date-input"
                />

                {values.type === 'debit' && (
                  <FormControl fullWidth>
                    <InputLabel>Expense Category</InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      label="Expense Category"
                      onChange={(e) => setFieldValue('category', e.target.value)}
                      data-testid="transaction-modal-category-select"
                    >
                      {EXPENSE_CATEGORIES.map((c) => (
                        <MenuItem key={c.value} value={c.value}>
                          {c.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  data-testid="transaction-modal-description-input"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} data-testid="transaction-modal-cancel-btn">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                data-testid="transaction-modal-submit-btn"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TransactionModal;
