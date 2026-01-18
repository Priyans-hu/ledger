import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import { Add, Delete, Visibility, Receipt, CheckCircle } from '@mui/icons-material';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import invoiceApiInstance from '../api/invoiceApi';
import customerApiInstance from '../api/customerApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const invoiceSchema = Yup.object({
  billingAddress: Yup.string().required('Billing address is required'),
  taxRate: Yup.number().min(0).max(100),
  discount: Yup.number().min(0),
  items: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Item name is required'),
      quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      unitPrice: Yup.number().min(0, 'Price must be non-negative').required('Price is required')
    })
  ).min(1, 'At least one item is required')
});

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
  }, []);

  const fetchInvoices = async () => {
    try {
      const [invoicesRes, summaryRes] = await Promise.all([
        invoiceApiInstance.getAllInvoices(),
        invoiceApiInstance.getInvoiceSummary()
      ]);
      setInvoices(invoicesRes.data.data.invoices || []);
      setSummary(summaryRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await customerApiInstance.getAllCustomers();
      setCustomers(response.data.data.customers || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCreateInvoice = async (values, { setSubmitting, resetForm }) => {
    try {
      await invoiceApiInstance.createInvoice(values);
      toast.success('Invoice created successfully');
      setCreateDialogOpen(false);
      resetForm();
      fetchInvoices();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create invoice';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewInvoice = async (invoice) => {
    try {
      const response = await invoiceApiInstance.getInvoiceById(invoice.invoiceId);
      setSelectedInvoice(response.data.data);
      setViewDialogOpen(true);
    } catch (error) {
      toast.error('Failed to load invoice details');
    }
  };

  const handleMarkAsPaid = async (invoiceId) => {
    try {
      await invoiceApiInstance.updateInvoice(invoiceId, { status: 'paid' });
      toast.success('Invoice marked as paid');
      fetchInvoices();
      setViewDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update invoice');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'default',
      sent: 'info',
      paid: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const calculateTotals = (items, taxRate = 0, discount = 0) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = (subtotal - discount) * (taxRate / 100);
    const total = subtotal - discount + taxAmount;
    return { subtotal, taxAmount, total };
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="min-h-screen flex justify-center items-center">
          <CircularProgress />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="px-4 py-8 min-h-[80vh]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Invoices</h1>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
              data-testid="invoice-create-btn"
            >
              Create Invoice
            </Button>
          </div>

          {/* Summary Cards */}
          {summary && (
            <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="text-center">
                  <Typography color="textSecondary" variant="body2">Draft</Typography>
                  <Typography variant="h5">{summary.byStatus.draft.count}</Typography>
                  <Typography variant="body2">₹{summary.byStatus.draft.total.toFixed(2)}</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <Typography color="textSecondary" variant="body2">Sent</Typography>
                  <Typography variant="h5">{summary.byStatus.sent.count}</Typography>
                  <Typography variant="body2">₹{summary.byStatus.sent.total.toFixed(2)}</Typography>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="text-center">
                  <Typography color="textSecondary" variant="body2">Paid</Typography>
                  <Typography variant="h5" className="text-green-700">{summary.byStatus.paid.count}</Typography>
                  <Typography variant="body2" className="text-green-600">₹{summary.byStatus.paid.total.toFixed(2)}</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <Typography color="textSecondary" variant="body2">Total</Typography>
                  <Typography variant="h5">{summary.totalInvoices}</Typography>
                  <Typography variant="body2">₹{summary.totalAmount.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Invoices Table */}
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice #</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" className="py-8 text-gray-500">
                      No invoices yet. Create your first invoice!
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.invoiceId} hover>
                      <TableCell>
                        <Box className="flex items-center gap-2">
                          <Receipt fontSize="small" color="action" />
                          {invoice.invoiceNumber}
                        </Box>
                      </TableCell>
                      <TableCell>{invoice.customerName || '-'}</TableCell>
                      <TableCell className="font-semibold">₹{invoice.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(invoice.status)}
                        />
                      </TableCell>
                      <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleViewInvoice(invoice)}
                          color="primary"
                          size="small"
                          data-testid={`invoice-view-btn-${invoice.invoiceId}`}
                        >
                          <Visibility />
                        </IconButton>
                        {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                          <IconButton
                            onClick={() => handleMarkAsPaid(invoice.invoiceId)}
                            color="success"
                            size="small"
                            data-testid={`invoice-paid-btn-${invoice.invoiceId}`}
                          >
                            <CheckCircle />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </main>
      <Footer />

      {/* Create Invoice Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Invoice</DialogTitle>
        <Formik
          initialValues={{
            customerId: '',
            billingAddress: '',
            taxRate: 18,
            discount: 0,
            notes: '',
            items: [{ name: '', quantity: 1, unitPrice: 0 }]
          }}
          validationSchema={invoiceSchema}
          onSubmit={handleCreateInvoice}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => {
            const totals = calculateTotals(values.items, values.taxRate, values.discount);

            return (
              <Form>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Customer (Optional)</InputLabel>
                      <Select
                        value={values.customerId}
                        label="Customer (Optional)"
                        onChange={(e) => {
                          setFieldValue('customerId', e.target.value);
                          const customer = customers.find(c => c.customerId === e.target.value);
                          if (customer) {
                            setFieldValue('billingAddress', customer.address);
                          }
                        }}
                        data-testid="invoice-customer-select"
                      >
                        <MenuItem value="">No Customer</MenuItem>
                        {customers.map((c) => (
                          <MenuItem key={c.customerId} value={c.customerId}>{c.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Field
                      as={TextField}
                      name="billingAddress"
                      label="Billing Address"
                      fullWidth
                      multiline
                      rows={2}
                      error={touched.billingAddress && Boolean(errors.billingAddress)}
                      helperText={touched.billingAddress && errors.billingAddress}
                      data-testid="invoice-address-input"
                    />

                    <Typography variant="subtitle1" className="mt-4">Items</Typography>
                    <FieldArray name="items">
                      {({ push, remove }) => (
                        <Box>
                          {values.items.map((item, index) => (
                            <Box key={index} className="flex gap-2 mb-2 items-start">
                              <Field
                                as={TextField}
                                name={`items.${index}.name`}
                                label="Item Name"
                                size="small"
                                className="flex-1"
                                data-testid={`invoice-item-name-${index}`}
                              />
                              <Field
                                as={TextField}
                                name={`items.${index}.quantity`}
                                label="Qty"
                                type="number"
                                size="small"
                                sx={{ width: 80 }}
                                inputProps={{ min: 1 }}
                                data-testid={`invoice-item-qty-${index}`}
                              />
                              <Field
                                as={TextField}
                                name={`items.${index}.unitPrice`}
                                label="Price"
                                type="number"
                                size="small"
                                sx={{ width: 100 }}
                                inputProps={{ min: 0 }}
                                data-testid={`invoice-item-price-${index}`}
                              />
                              <Typography className="self-center w-24 text-right">
                                ₹{(item.quantity * item.unitPrice).toFixed(2)}
                              </Typography>
                              {values.items.length > 1 && (
                                <IconButton onClick={() => remove(index)} color="error" size="small">
                                  <Delete />
                                </IconButton>
                              )}
                            </Box>
                          ))}
                          <Button
                            startIcon={<Add />}
                            onClick={() => push({ name: '', quantity: 1, unitPrice: 0 })}
                            size="small"
                            data-testid="invoice-add-item-btn"
                          >
                            Add Item
                          </Button>
                        </Box>
                      )}
                    </FieldArray>

                    <Box className="flex gap-4 mt-4">
                      <Field
                        as={TextField}
                        name="taxRate"
                        label="Tax Rate (%)"
                        type="number"
                        size="small"
                        sx={{ width: 120 }}
                        data-testid="invoice-tax-input"
                      />
                      <Field
                        as={TextField}
                        name="discount"
                        label="Discount (₹)"
                        type="number"
                        size="small"
                        sx={{ width: 120 }}
                        data-testid="invoice-discount-input"
                      />
                    </Box>

                    <Box className="bg-gray-50 p-4 rounded mt-4">
                      <Box className="flex justify-between mb-2">
                        <Typography>Subtotal:</Typography>
                        <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
                      </Box>
                      {values.discount > 0 && (
                        <Box className="flex justify-between mb-2 text-red-600">
                          <Typography>Discount:</Typography>
                          <Typography>-₹{values.discount.toFixed(2)}</Typography>
                        </Box>
                      )}
                      <Box className="flex justify-between mb-2">
                        <Typography>Tax ({values.taxRate}%):</Typography>
                        <Typography>₹{totals.taxAmount.toFixed(2)}</Typography>
                      </Box>
                      <Box className="flex justify-between font-bold text-lg border-t pt-2">
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6">₹{totals.total.toFixed(2)}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    data-testid="invoice-submit-btn"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Invoice'}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Invoice #{selectedInvoice?.invoiceNumber}</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box>
              <Box className="mb-4">
                <Chip
                  label={selectedInvoice.status.toUpperCase()}
                  color={getStatusColor(selectedInvoice.status)}
                  className="mb-2"
                />
                <Typography variant="body2" color="textSecondary">
                  Created: {new Date(selectedInvoice.createdAt).toLocaleString()}
                </Typography>
              </Box>

              <Typography variant="subtitle2">Billing Address:</Typography>
              <Typography className="mb-4">{selectedInvoice.billingAddress}</Typography>

              <Typography variant="subtitle2" className="mb-2">Items:</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedInvoice.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">₹{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell align="right">₹{item.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Box className="mt-4 bg-gray-50 p-3 rounded">
                <Box className="flex justify-between">
                  <Typography>Subtotal:</Typography>
                  <Typography>₹{selectedInvoice.subtotal.toFixed(2)}</Typography>
                </Box>
                {selectedInvoice.discount > 0 && (
                  <Box className="flex justify-between text-red-600">
                    <Typography>Discount:</Typography>
                    <Typography>-₹{selectedInvoice.discount.toFixed(2)}</Typography>
                  </Box>
                )}
                <Box className="flex justify-between">
                  <Typography>Tax ({selectedInvoice.taxRate}%):</Typography>
                  <Typography>₹{selectedInvoice.taxAmount.toFixed(2)}</Typography>
                </Box>
                <Box className="flex justify-between font-bold border-t mt-2 pt-2">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">₹{selectedInvoice.totalAmount.toFixed(2)}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          {selectedInvoice?.status !== 'paid' && selectedInvoice?.status !== 'cancelled' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleMarkAsPaid(selectedInvoice.invoiceId)}
              data-testid="invoice-mark-paid-btn"
            >
              Mark as Paid
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Invoices;
