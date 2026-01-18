# Ledger

A modern shop management system for small businesses. Track customers, manage transactions, generate invoices, and analyze your business performance.

![CI](https://github.com/Priyans-hu/ledger/actions/workflows/ci.yml/badge.svg)

## Features

- **Customer Management** - Add, edit, delete customers with search and filtering
- **Transaction Tracking** - Record credits and debits with expense categorization
- **Invoice Generation** - Create GST-compliant invoices with multiple items
- **Dashboard Analytics** - Visualize monthly revenue, expenses, and trends
- **Profile Management** - Update store information and change password
- **Data Export** - Export transactions to CSV for external analysis
- **Secure Authentication** - JWT-based auth with token refresh

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Material-UI 5, Tailwind CSS 3, React Router 6 |
| Backend | Node.js 20, Express 4, PostgreSQL 16 |
| Security | Helmet, Express Rate Limit, Express Validator, bcryptjs |
| Forms | Formik, Yup |
| CI/CD | GitHub Actions |

## Project Structure

```
ledger/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client modules
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   └── pages/         # Page components
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database and app config
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth, validation, rate limiting
│   ├── models/            # PostgreSQL table schemas
│   ├── routes/            # API route definitions
│   └── package.json
└── .github/workflows/     # CI/CD pipeline
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- npm 10+

### Database Setup

```sql
CREATE DATABASE ledger;
```

### Server Setup

```bash
cd server
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run dev
```

### Client Setup

```bash
cd client
cp .env.example .env
npm install
npm start
```

The app will be available at `http://localhost:3000`

## Environment Variables

### Server (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database user | - |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `ledger` |
| `JWT_SECRET` | JWT signing secret | - |

### Client (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

## API Endpoints

### Authentication
- `POST /api/store/register` - Register new store
- `POST /api/store/login` - Login
- `GET /api/store/profile` - Get profile
- `PUT /api/store/profile` - Update profile
- `PUT /api/store/change-password` - Change password

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/export` - Export to CSV

### Invoices
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

## Scripts

### Server
```bash
npm run dev      # Development with hot reload
npm start        # Production
npm test         # Run tests
npm run lint     # Lint code
```

### Client
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
npm run lint     # Lint code
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contact

Priyanshu - [LinkedIn](https://www.linkedin.com/in/priyans-hu) - [GitHub](https://github.com/Priyans-hu)
