import React, { useEffect, useState, useCallback } from 'react';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tooltip,
  Pagination
} from '@mui/material';
import { Search, Edit, Delete, Add } from '@mui/icons-material';
import customerApiInstance from '../api/customerApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomerModal from '../components/CustomerModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [pagination, setPagination] = useState({ total: 0, limit: 10, offset: 0, page: 1 });

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await customerApiInstance.getAllCustomers({
        search: search || undefined,
        sortBy,
        order,
        limit: pagination.limit,
        offset: pagination.offset
      });
      setCustomers(response.data.data.customers);
      setPagination(prev => ({ ...prev, ...response.data.data.pagination }));
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to fetch customers');
      setCustomers([]);
    }
  }, [search, sortBy, order, pagination.limit, pagination.offset]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchCustomers();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchCustomers]);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleModalSubmit = async (values) => {
    try {
      if (editingCustomer) {
        await customerApiInstance.updateCustomer(editingCustomer.customerId, values);
        toast.success('Customer updated successfully');
      } else {
        await customerApiInstance.createCustomer(values);
        toast.success('Customer added successfully');
      }
      setModalOpen(false);
      fetchCustomers();
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed';
      toast.error(message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await customerApiInstance.deleteCustomer(customerToDelete.customerId);
      toast.success('Customer deleted successfully');
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
      fetchCustomers();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete customer';
      toast.error(message);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
      offset: (newPage - 1) * prev.limit
    }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  if (customers === null) {
    return (
      <div>
        <Header />
        <main className="min-h-screen flex justify-center items-center">
          <div className="text-center">
            <p>Loading...</p>
          </div>
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
          <h1 className="text-3xl font-bold mb-6 text-center">Customers</h1>

          {/* Search and Filter Bar */}
          <Box className="flex flex-col md:flex-row gap-4 mb-6">
            <TextField
              placeholder="Search by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              data-testid="customer-search-input"
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="customer-sort-select"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="total_spent">Total Spent</MenuItem>
                <MenuItem value="created_at">Date Added</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Order</InputLabel>
              <Select
                value={order}
                label="Order"
                onChange={(e) => setOrder(e.target.value)}
                data-testid="customer-order-select"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddCustomer}
              data-testid="customer-add-btn"
            >
              Add Customer
            </Button>
          </Box>

          {/* Results Count */}
          <p className="text-gray-600 mb-4">
            Showing {customers.length} of {pagination.total} customers
          </p>

          {/* Customers Table */}
          {customers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">
                {search ? 'No customers found matching your search.' : 'No customers added yet.'}
              </p>
              {!search && (
                <Button
                  variant="contained"
                  className="mt-4"
                  onClick={handleAddCustomer}
                  data-testid="customer-empty-add-btn"
                >
                  Add Your First Customer
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold">Name</th>
                      <th className="px-6 py-3 text-left font-bold">Phone</th>
                      <th className="px-6 py-3 text-left font-bold">Email</th>
                      <th className="px-6 py-3 text-left font-bold">Address</th>
                      <th className="px-6 py-3 text-left font-bold">Total Spent</th>
                      <th className="px-6 py-3 text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.customerId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {customer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {customer.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {customer.email || '-'}
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          {customer.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                          ₹{customer.totalSpent?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEditCustomer(customer)}
                              color="primary"
                              size="small"
                              data-testid={`customer-edit-btn-${customer.customerId}`}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDeleteClick(customer)}
                              color="error"
                              size="small"
                              data-testid={`customer-delete-btn-${customer.customerId}`}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <Box className="flex justify-center mt-6">
                  <Pagination
                    count={totalPages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    data-testid="customer-pagination"
                  />
                </Box>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />

      {/* Customer Modal */}
      <CustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        customer={editingCustomer}
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setCustomerToDelete(null);
        }}
        confirmText="Delete"
      />
    </div>
  );
};

export default ViewCustomers;
