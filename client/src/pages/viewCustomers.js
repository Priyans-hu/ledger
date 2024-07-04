import React, { useEffect, useState } from 'react';
import customerApiInstance from '../api/customerApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ViewCustomers = () => {
    const [customers, setCustomers] = useState(null);
    
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await customerApiInstance.getAllCustomers();
                setCustomers(response.data.customers);
            } catch (error) {
                console.error('Error fetching customers:', error);
                setCustomers([]);
            }
        };
    
        fetchCustomers();
    }, []);

    // Render loading or empty state
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
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center">View All Customers</h1>
                    {customers.length === 0 ? (
                        <p className="text-gray-600">No customers added yet. Start by adding a customer!</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-100 text-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-bold">Name</th>
                                        <th className="px-6 py-3 text-left font-bold">Email</th>
                                        <th className="px-6 py-3 text-left font-bold">Phone</th>
                                        <th className="px-6 py-3 text-left font-bold">Address</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {customers.map(customer => (
                                        <tr key={customer.customerid}>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.phonenumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="mt-4 flex flex-row-reverse w-full">
                        <Link to="/add-customer">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                Add Customer
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ViewCustomers;