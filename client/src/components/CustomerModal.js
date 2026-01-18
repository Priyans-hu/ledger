import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be less than 255 characters')
    .required('Name is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email format'),
  address: Yup.string()
    .required('Address is required')
});

const CustomerModal = ({
  open,
  onClose,
  onSubmit,
  customer = null,
  title = 'Add Customer'
}) => {
  const initialValues = {
    name: customer?.name || '',
    phoneNumber: customer?.phoneNumber || '',
    email: customer?.email || '',
    address: customer?.address || ''
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  data-testid="customer-modal-name-input"
                />
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  data-testid="customer-modal-phone-input"
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  data-testid="customer-modal-email-input"
                />
                <Field
                  as={TextField}
                  name="address"
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  data-testid="customer-modal-address-input"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} data-testid="customer-modal-cancel-btn">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                data-testid="customer-modal-submit-btn"
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

export default CustomerModal;
