import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import AuthProvider from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/pageNotFound';
import Dashboard from './pages/dashboard';
import AddCustomer from './pages/addCustomer';
import ViewCustomers from './pages/viewCustomers';
import AddTransaction from './pages/addTransaction';
import ManageTransactions from './pages/manageTransactions';
import Profile from './pages/profile';
import Invoices from './pages/invoices';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* Customer Management */}
            <Route path="/add-customer" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
            <Route path="/view-customers" element={<PrivateRoute><ViewCustomers /></PrivateRoute>} />
            <Route path="/customers" element={<PrivateRoute><ViewCustomers /></PrivateRoute>} />

            {/* Transaction Management */}
            <Route path="/add-transaction" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
            <Route path="/manage-transactions" element={<PrivateRoute><ManageTransactions /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><ManageTransactions /></PrivateRoute>} />

            {/* Invoice Management */}
            <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
            <Route path="/generate-invoice" element={<PrivateRoute><Invoices /></PrivateRoute>} />

            {/* 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
