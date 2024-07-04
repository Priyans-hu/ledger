import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import AuthProvider from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComingSoon from './pages/comingSoon';
import PageNotFound from './pages/pageNotFound';
import Dashboard from './pages/dashboard';
import AddCustomer from './pages/addCustomer';
import ViewCustomers from './pages/viewCustomers';
import AddTransaction from './pages/addTransaction';
import ManageTransactions from './pages/manageTransactions';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/generate-invoice" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
            <Route path="/add-customer" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
            <Route path="/view-customers" element={<PrivateRoute><ViewCustomers /></PrivateRoute>} />
            <Route path="/add-transaction" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
            <Route path="/manage-transactions" element={<PrivateRoute><ManageTransactions /></PrivateRoute>} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
