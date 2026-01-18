const { body, validationResult } = require('express-validator');

describe('Input Validation', () => {
  describe('Email Validation', () => {
    it('should accept valid email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.org',
        'user+tag@domain.co.in'
      ];

      validEmails.forEach(email => {
        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@nodomain.com',
        'spaces in@email.com',
        'double@@at.com'
      ];

      invalidEmails.forEach(email => {
        expect(email).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });
  });

  describe('Phone Number Validation', () => {
    it('should accept valid Indian phone numbers', () => {
      const validPhones = ['9876543210', '8765432109', '7654321098'];
      const phoneRegex = /^[6-9]\d{9}$/;

      validPhones.forEach(phone => {
        expect(phone).toMatch(phoneRegex);
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = ['1234567890', '12345', '98765432101'];
      const phoneRegex = /^[6-9]\d{9}$/;

      invalidPhones.forEach(phone => {
        expect(phone).not.toMatch(phoneRegex);
      });
    });
  });

  describe('GST Number Validation', () => {
    it('should accept valid GST number format', () => {
      const validGST = ['27AAPFU0939F1ZV', '06BZAHM6385P6Z2'];
      const gstRegex = /^[0-9A-Z]{15}$/;

      validGST.forEach(gst => {
        expect(gst).toMatch(gstRegex);
      });
    });

    it('should reject invalid GST numbers', () => {
      const invalidGST = ['27AAPFU0939F1Z', 'lowercase1234567'];
      const gstRegex = /^[0-9A-Z]{15}$/;

      invalidGST.forEach(gst => {
        expect(gst).not.toMatch(gstRegex);
      });
    });
  });

  describe('Amount Validation', () => {
    it('should accept positive amounts', () => {
      const amounts = [0.01, 1, 100, 9999.99];

      amounts.forEach(amount => {
        expect(amount).toBeGreaterThan(0);
        expect(typeof amount).toBe('number');
      });
    });

    it('should reject zero or negative amounts', () => {
      const invalidAmounts = [0, -1, -100];

      invalidAmounts.forEach(amount => {
        expect(amount).not.toBeGreaterThan(0);
      });
    });
  });
});
