<p align="center">
  <img src="https://img.shields.io/badge/Ledger-Shop%20Management-blue?style=for-the-badge&logo=bookstack" alt="Ledger Logo" />
</p>

<h1 align="center">Ledger - Shop Management System</h1>

<p align="center">
  <strong>A modern, open-source shop management solution for small businesses in India</strong>
</p>

<p align="center">
  <a href="https://github.com/Priyans-hu/ledger/actions/workflows/ci.yml">
    <img src="https://github.com/Priyans-hu/ledger/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <a href="https://github.com/Priyans-hu/ledger/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Priyans-hu/ledger?color=blue" alt="License" />
  </a>
  <a href="https://github.com/Priyans-hu/ledger/stargazers">
    <img src="https://img.shields.io/github/stars/Priyans-hu/ledger?style=social" alt="Stars" />
  </a>
  <a href="https://github.com/Priyans-hu/ledger/network/members">
    <img src="https://img.shields.io/github/forks/Priyans-hu/ledger?style=social" alt="Forks" />
  </a>
  <a href="https://github.com/Priyans-hu/ledger/issues">
    <img src="https://img.shields.io/github/issues/Priyans-hu/ledger" alt="Issues" />
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Why Ledger?

Managing a small shop shouldn't require expensive software or complex systems. **Ledger** is built specifically for Indian small business owners who need:

- **Simple billing** with GST-compliant invoices
- **Customer tracking** to build relationships
- **Expense management** to understand where money goes
- **Visual analytics** to make better business decisions

All in a modern, easy-to-use web application that works on any device.

## Features

### Customer Management
- Add, edit, and delete customers with detailed profiles
- Search and filter customers instantly
- Track purchase history and total spending per customer
- Pagination for handling large customer lists

### Transaction Tracking
- Record credits (income) and debits (expenses)
- Categorize expenses: rent, utilities, salary, marketing, inventory, and more
- Filter transactions by date, month, year, or category
- Export transactions to CSV for spreadsheet analysis

### GST Invoice Generation
- Create professional GST-compliant invoices
- Add multiple line items with quantity and pricing
- Automatic tax calculations with configurable tax rates
- Apply discounts (percentage or fixed amount)
- Export invoices as PDF documents
- Track invoice status: draft, sent, paid, cancelled

### Dashboard Analytics
- Visual charts showing monthly revenue trends
- Credit vs. debit breakdown with pie charts
- Expense category analysis
- Quick stats: total customers, transactions, revenue

### Security & Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Protected API routes

## Demo

| Landing Page | Dashboard | Invoice |
|:---:|:---:|:---:|
| ![Landing](https://via.placeholder.com/300x200?text=Landing+Page) | ![Dashboard](https://via.placeholder.com/300x200?text=Dashboard) | ![Invoice](https://via.placeholder.com/300x200?text=Invoice) |

> **Note**: Replace placeholder images with actual screenshots

## Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br>React 18
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
      <br>Node.js
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
      <br>Express
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=postgres" width="48" height="48" alt="PostgreSQL" />
      <br>PostgreSQL
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br>Tailwind
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=docker" width="48" height="48" alt="Docker" />
      <br>Docker
    </td>
  </tr>
</table>

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Material-UI 5, Tailwind CSS 3, Chart.js, Formik + Yup |
| **Backend** | Node.js 20, Express 4, PostgreSQL 16 |
| **Security** | Helmet, Express Rate Limit, bcryptjs, JWT |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Priyans-hu/ledger.git
cd ledger

# Start all services
docker-compose up -d

# Access the app
open http://localhost:3000
```

### Option 2: Manual Setup

#### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm 10+

#### 1. Clone & Setup Database

```bash
git clone https://github.com/Priyans-hu/ledger.git
cd ledger

# Create database
psql -c "CREATE DATABASE ledger;"
```

#### 2. Setup Backend

```bash
cd server
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run db:setup  # Creates tables
npm run dev
```

#### 3. Setup Frontend

```bash
cd client
cp .env.example .env
npm install
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
ledger/
├── client/                     # React frontend
│   ├── src/
│   │   ├── api/               # API client modules
│   │   ├── components/        # Reusable UI components
│   │   │   └── landing/       # Landing page sections
│   │   ├── context/           # React context providers
│   │   ├── pages/             # Page components
│   │   └── types/             # TypeScript type definitions
│   ├── Dockerfile
│   └── package.json
├── server/                     # Express backend
│   ├── config/                # Database and app config
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth, validation, rate limiting
│   ├── models/                # PostgreSQL table schemas
│   ├── routes/                # API route definitions
│   ├── types/                 # JSDoc type definitions
│   ├── __tests__/             # Test files
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml          # Docker orchestration
└── .github/workflows/          # CI/CD pipeline
```

## Documentation

### Environment Variables

<details>
<summary><strong>Server Configuration</strong></summary>

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database user | - |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `ledger` |
| `JWT_SECRET` | JWT signing secret (required) | - |
| `JWT_EXPIRY` | Token expiration time | `24h` |
| `NODE_ENV` | Environment | `development` |

</details>

<details>
<summary><strong>Client Configuration</strong></summary>

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

</details>

### API Reference

<details>
<summary><strong>Authentication Endpoints</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/store/register` | Register new store |
| POST | `/api/store/login` | Login and get token |
| GET | `/api/store/profile` | Get store profile |
| PUT | `/api/store/profile` | Update profile |
| PUT | `/api/store/change-password` | Change password |

</details>

<details>
<summary><strong>Customer Endpoints</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List customers (paginated) |
| POST | `/api/customers` | Create customer |
| GET | `/api/customers/:id` | Get customer by ID |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |

</details>

<details>
<summary><strong>Transaction Endpoints</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | List transactions (filtered) |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/transactions/summary` | Get summary stats |
| GET | `/api/transactions/export` | Export to CSV |

</details>

<details>
<summary><strong>Invoice Endpoints</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | List invoices |
| POST | `/api/invoices` | Create invoice |
| GET | `/api/invoices/:id` | Get invoice by ID |
| PUT | `/api/invoices/:id` | Update invoice |
| DELETE | `/api/invoices/:id` | Delete invoice |

</details>

## Scripts

### Server
```bash
npm run dev      # Development with hot reload
npm start        # Production mode
npm test         # Run tests with coverage
npm run lint     # Lint code
npm run db:setup # Setup database tables
```

### Client
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
npm run lint     # Lint code
```

## Roadmap

- [ ] Multi-language support (Hindi, Marathi, Tamil)
- [ ] Offline mode with sync
- [ ] Mobile app (React Native)
- [ ] Inventory management
- [ ] Barcode/QR code scanning
- [ ] Payment gateway integration
- [ ] WhatsApp invoice sharing
- [ ] GST return reports
- [ ] Multi-store support

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Contributors

<a href="https://github.com/Priyans-hu/ledger/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Priyans-hu/ledger" />
</a>

## Support

- Star this repository if you find it useful
- Report bugs by [opening an issue](https://github.com/Priyans-hu/ledger/issues/new?template=bug_report.md)
- Request features by [opening an issue](https://github.com/Priyans-hu/ledger/issues/new?template=feature_request.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Priyanshu** - Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/priyans-hu)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Priyans-hu)

---

<p align="center">
  Made with ❤️ in India
</p>

<p align="center">
  <a href="#ledger---shop-management-system">Back to top</a>
</p>
