const request = require('supertest');

// Set environment variables before importing anything
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.NODE_ENV = 'test';

// Mock the database config before importing app
jest.mock('../config', () => ({
  postgresPool: {
    query: jest.fn(),
    connect: jest.fn()
  }
}));

const app = require('../server');

describe('Health Check Endpoints', () => {
  describe('GET /health', () => {
    it('should return 200 and success message', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Server is running');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/health', () => {
    it('should return 200 and API healthy message', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'API is healthy');
    });
  });

  describe('GET /', () => {
    it('should return welcome message with API version', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Welcome to the Ledger API');
      expect(response.body).toHaveProperty('version', '2.0.0');
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Endpoint not found');
    });
  });
});
