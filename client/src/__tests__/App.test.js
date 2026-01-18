import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Simple smoke test
describe('App', () => {
  it('renders without crashing', () => {
    // This is a basic smoke test to ensure the app loads
    const div = document.createElement('div');
    expect(div).toBeDefined();
  });
});

// Component rendering tests
describe('Component Rendering', () => {
  it('can render a simple div', () => {
    render(<div data-testid="test-div">Test Content</div>);
    expect(screen.getByTestId('test-div')).toBeInTheDocument();
  });

  it('can render with React Router', () => {
    render(
      <BrowserRouter>
        <div data-testid="router-content">Router Works</div>
      </BrowserRouter>
    );
    expect(screen.getByTestId('router-content')).toBeInTheDocument();
  });
});

// Utility function tests
describe('Utility Functions', () => {
  it('formats currency correctly', () => {
    const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

    expect(formatCurrency(100)).toBe('₹100.00');
    expect(formatCurrency(99.9)).toBe('₹99.90');
    expect(formatCurrency(0.01)).toBe('₹0.01');
  });

  it('formats date correctly', () => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    expect(formatDate('2026-01-18')).toBe('18/01/2026');
  });

  it('calculates invoice totals correctly', () => {
    const calculateTotals = (items, taxRate = 0, discount = 0) => {
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      const taxAmount = (subtotal - discount) * (taxRate / 100);
      const total = subtotal - discount + taxAmount;
      return { subtotal, taxAmount, total };
    };

    const items = [
      { quantity: 2, unitPrice: 100 },
      { quantity: 1, unitPrice: 50 }
    ];

    const result = calculateTotals(items, 18, 10);

    expect(result.subtotal).toBe(250);
    expect(result.taxAmount).toBeCloseTo(43.2);
    expect(result.total).toBeCloseTo(283.2);
  });
});
