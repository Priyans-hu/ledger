# Ledger - AI Development Instructions

## Project Overview

Ledger is a full-stack shop management system for Indian small businesses. It handles customer management, transaction tracking (khata), invoicing, and financial reporting.

## Tech Stack

### Frontend (`/client`)
- **Framework**: React 18 with Create React App
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Tailwind CSS + Emotion
- **State Management**: Redux Toolkit
- **Forms**: Formik + Yup validation
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Backend (`/server`)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, rate-limiting

## Project Structure

```
ledger/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── context/        # React context (auth)
│   │   ├── hooks/          # Custom hooks
│   │   ├── helpers/        # Utility functions
│   │   ├── middleware/     # Auth middleware
│   │   └── images/         # Static assets
│   └── public/
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── routes/             # API route definitions
│   ├── models/             # Database models & schema
│   ├── middleware/         # Express middleware
│   ├── __tests__/          # Jest tests
│   └── server.js           # Entry point
└── docker-compose.yml      # Docker setup
```

## Development Commands

### Client
```bash
cd client
npm start           # Dev server (port 3000)
npm run build       # Production build
npm test            # Run tests
npm run lint        # Check linting
npm run lint:fix    # Fix lint issues
```

### Server
```bash
cd server
npm run dev         # Dev server with nodemon (port 5000)
npm start           # Production server
npm test            # Run Jest tests
npm run db:setup    # Initialize database tables
```

### Docker
```bash
docker-compose up -d         # Start all services
docker-compose down          # Stop services
docker-compose logs -f       # View logs
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Transactions
- `GET /api/transactions` - List transactions (supports pagination)
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/export` - Export as CSV/PDF

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Coding Guidelines

### General
- Use ES6+ syntax throughout
- Prefer functional components with hooks
- Keep components small and focused
- Use meaningful variable/function names

### Frontend
- Place reusable components in `/components`
- Use MUI components for consistent UI
- Tailwind for custom styling when needed
- Always handle loading and error states
- Use React Router for navigation

### Backend
- Controllers handle request/response logic
- Models contain database queries
- Use async/await for async operations
- Validate all inputs with express-validator
- Return consistent JSON responses:
  ```json
  { "success": true, "data": {...} }
  { "success": false, "message": "Error description" }
  ```

### Database
- Use parameterized queries (prevent SQL injection)
- Follow existing table structure in `models/`
- Use transactions for multi-step operations

## Environment Variables

### Client (`.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

### Server (`.env`)
```
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/ledger
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## Testing

- Frontend: React Testing Library
- Backend: Jest + Supertest
- Run `npm test` in respective directories
- Tests located in `__tests__/` folders

## Common Tasks

### Adding a new API endpoint
1. Create route in `server/routes/`
2. Create controller in `server/controllers/`
3. Add validation middleware
4. Register route in `server.js`

### Adding a new page
1. Create component in `client/src/pages/`
2. Add route in `App.js`
3. Update navigation if needed

### Modifying database schema
1. Update SQL in `server/models/makeSQLTables.js`
2. Run `npm run db:setup`
3. Update relevant model files

## Notes

- Currency is INR (Indian Rupees)
- Date format: Use date-fns for formatting
- All API routes are prefixed with `/api`
- JWT token stored in cookies
- Protected routes require authentication middleware
