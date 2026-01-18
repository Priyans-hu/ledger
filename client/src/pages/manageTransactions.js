import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  TableContainer,
  Paper,
  Menu,
  MenuItem,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Box,
  Chip
} from '@mui/material';
import { Edit, Delete, Download, Add, Sort } from '@mui/icons-material';
import transactionApi from '../api/transactionApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionModal from '../components/TransactionModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState('');
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [summary, setSummary] = useState({ totalCredit: 0, totalDebit: 0 });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const defaultMonth = new Date().getMonth() + 1;
    setSelectedMonth(defaultMonth.toString());
    fetchTransactions(defaultMonth, selectedYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  const fetchTransactions = async (month, year) => {
    try {
      const response = await transactionApi.getTransactionsByMonth(month, year);
      const data = response.data.data;
      setTransactions(data.transactions || []);
      setSummary(data.summary || { totalCredit: 0, totalDebit: 0 });
      calculateMonthlyTotal(data.transactions || []);
    } catch (error) {
      toast.error('Failed to fetch transactions');
      setTransactions([]);
    }
  };

  const fetchTransactionsByDate = async () => {
    if (!date) {
      toast.warning('Please select a date');
      return;
    }
    try {
      const response = await transactionApi.getTransactionsByDate(date);
      const data = response.data.data;
      setTransactions(data.transactions || []);
      calculateMonthlyTotal(data.transactions || []);
    } catch (error) {
      toast.error('Failed to fetch transactions by date');
    }
  };

  const calculateMonthlyTotal = (transactions) => {
    const total = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      return acc + (transaction.type === 'credit' ? amount : -amount);
    }, 0);
    setMonthlyTotal(total.toFixed(2));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSortOption = (option) => {
    handleSortTransactions(option);
    setAnchorEl(null);
  };

  const handleSortTransactions = (option) => {
    let sortedTransactions = [...transactions];
    switch (option) {
      case 'dateNewToOld':
        sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'dateOldToNew':
        sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amountHighToLow':
        sortedTransactions.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
        break;
      case 'amountLowToHigh':
        sortedTransactions.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
        break;
      default:
        break;
    }
    setTransactions(sortedTransactions);
  };

  const resetFilters = () => {
    const defaultMonth = new Date().getMonth() + 1;
    setSelectedMonth(defaultMonth.toString());
    setSelectedYear(new Date().getFullYear());
    fetchTransactions(defaultMonth, new Date().getFullYear());
    setDate('');
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    fetchTransactions(month, selectedYear);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const handleModalSubmit = async (values) => {
    try {
      if (editingTransaction) {
        await transactionApi.updateTransaction(editingTransaction.transactionId, values);
        toast.success('Transaction updated successfully');
      } else {
        await transactionApi.createTransaction(values);
        toast.success('Transaction added successfully');
      }
      setModalOpen(false);
      setEditingTransaction(null);
      fetchTransactions(selectedMonth, selectedYear);
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed';
      toast.error(message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await transactionApi.deleteTransaction(transactionToDelete.transactionId);
      toast.success('Transaction deleted successfully');
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
      fetchTransactions(selectedMonth, selectedYear);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete transaction';
      toast.error(message);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const response = await transactionApi.exportTransactions({ format: 'csv' });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Transactions exported successfully');
    } catch (error) {
      toast.error('Failed to export transactions');
    } finally {
      setExporting(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      rent: 'error',
      utilities: 'warning',
      supplies: 'info',
      salary: 'primary',
      marketing: 'secondary',
      maintenance: 'default',
      transport: 'success',
      inventory: 'info',
      other: 'default'
    };
    return colors[category] || 'default';
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-16 p-4 min-h-[80vh]">
        <h1 className="text-4xl text-center font-bold mb-8">Manage Transactions</h1>

        {/* Summary Cards */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600">Total Credit</p>
            <p className="text-2xl font-bold text-green-700">₹{summary.totalCredit?.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">Total Debit</p>
            <p className="text-2xl font-bold text-red-700">₹{summary.totalDebit?.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg border ${monthlyTotal >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
            <p className="text-sm text-gray-600">Net Balance</p>
            <p className={`text-2xl font-bold ${monthlyTotal >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
              ₹{monthlyTotal}
            </p>
          </div>
        </Box>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-6">
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="select-month-label">Month</InputLabel>
            <Select
              labelId="select-month-label"
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Month"
              data-testid="transaction-month-select"
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                <MenuItem key={month} value={month.toString()}>
                  {new Date(2024, month - 1, 1).toLocaleString('default', { month: 'long' })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                fetchTransactions(selectedMonth, e.target.value);
              }}
              label="Year"
              data-testid="transaction-year-select"
            >
              {[2024, 2025, 2026].map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Filter by Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-testid="transaction-date-filter"
          />

          <Button
            variant="contained"
            onClick={fetchTransactionsByDate}
            data-testid="transaction-filter-date-btn"
          >
            Filter
          </Button>

          {date && (
            <Button variant="outlined" onClick={resetFilters} data-testid="transaction-reset-btn">
              Reset
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<Sort />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            data-testid="transaction-sort-btn"
          >
            Sort
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSortOption('dateNewToOld')}>
              <ListItemText primary="Date: New to Old" />
            </MenuItem>
            <MenuItem onClick={() => handleSortOption('dateOldToNew')}>
              <ListItemText primary="Date: Old to New" />
            </MenuItem>
            <MenuItem onClick={() => handleSortOption('amountHighToLow')}>
              <ListItemText primary="Amount: High to Low" />
            </MenuItem>
            <MenuItem onClick={() => handleSortOption('amountLowToHigh')}>
              <ListItemText primary="Amount: Low to High" />
            </MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExportCSV}
            disabled={exporting}
            data-testid="transaction-export-btn"
          >
            {exporting ? 'Exporting...' : 'Export CSV'}
          </Button>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditingTransaction(null);
              setModalOpen(true);
            }}
            data-testid="transaction-add-btn"
          >
            Add Transaction
          </Button>
        </div>

        {/* Transactions Table */}
        <TableContainer component={Paper} className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <td className="px-4 py-3 text-left font-bold">#</td>
                <td className="px-4 py-3 text-left font-bold">Amount</td>
                <td className="px-4 py-3 text-left font-bold">Description</td>
                <td className="px-4 py-3 text-left font-bold">Date</td>
                <td className="px-4 py-3 text-left font-bold">Type</td>
                <td className="px-4 py-3 text-left font-bold">Method</td>
                <td className="px-4 py-3 text-left font-bold">Category</td>
                <td className="px-4 py-3 text-center font-bold">Actions</td>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    No transactions found for this period
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction.transactionId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td
                      className="px-4 py-3 font-semibold"
                      style={{ color: transaction.type === 'credit' ? '#16a34a' : '#dc2626' }}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}₹{parseFloat(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {transaction.description || '-'}
                    </td>
                    <td className="px-4 py-3">{formatDate(transaction.date)}</td>
                    <td className="px-4 py-3">
                      <Chip
                        label={transaction.type.toUpperCase()}
                        size="small"
                        color={transaction.type === 'credit' ? 'success' : 'error'}
                      />
                    </td>
                    <td className="px-4 py-3 uppercase text-sm">{transaction.method}</td>
                    <td className="px-4 py-3">
                      {transaction.category && transaction.category !== 'none' && (
                        <Chip
                          label={transaction.category}
                          size="small"
                          color={getCategoryColor(transaction.category)}
                          variant="outlined"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEditTransaction(transaction)}
                          color="primary"
                          size="small"
                          data-testid={`transaction-edit-btn-${transaction.transactionId}`}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteClick(transaction)}
                          color="error"
                          size="small"
                          data-testid={`transaction-delete-btn-${transaction.transactionId}`}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableContainer>
      </div>
      <Footer />

      {/* Transaction Modal */}
      <TransactionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleModalSubmit}
        transaction={editingTransaction}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Transaction"
        message={`Are you sure you want to delete this ₹${transactionToDelete?.amount} ${transactionToDelete?.type} transaction? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setTransactionToDelete(null);
        }}
        confirmText="Delete"
      />
    </>
  );
};

export default ManageTransactions;
