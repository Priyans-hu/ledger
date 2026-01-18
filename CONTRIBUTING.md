# Contributing to Ledger

First off, thank you for considering contributing to Ledger! It's people like you that make Ledger such a great tool for small business owners.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, browser, Node.js version)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed feature**
- **Explain why this feature would be useful**
- **Include mockups or examples if possible**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the coding style** of the project
3. **Write clear commit messages** following [Conventional Commits](https://www.conventionalcommits.org/)
4. **Include tests** if adding new functionality
5. **Update documentation** as needed
6. **Ensure CI passes** before requesting review

## Development Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- npm 10+

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ledger.git
cd ledger

# Add upstream remote
git remote add upstream https://github.com/Priyans-hu/ledger.git

# Install dependencies
cd server && npm install
cd ../client && npm install

# Setup environment
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit .env files with your config

# Start development servers
cd server && npm run dev
cd client && npm start
```

### Running Tests

```bash
# Server tests
cd server && npm test

# Client tests
cd client && npm test
```

## Coding Guidelines

### JavaScript/React

- Use functional components with hooks
- Use meaningful variable and function names
- Keep components small and focused
- Use PropTypes or TypeScript for type checking

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add customer search functionality
fix: resolve invoice calculation bug
docs: update API documentation
style: format code with prettier
refactor: simplify transaction controller
test: add customer API tests
chore: update dependencies
```

### Branch Naming

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/what-changed` - Code refactoring

## Project Structure

```
ledger/
├── client/          # React frontend
│   ├── src/
│   │   ├── api/     # API clients
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
├── server/          # Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
```

## Getting Help

- Open an issue for bugs or features
- Start a discussion for questions
- Check existing issues and discussions first

## Recognition

Contributors will be recognized in the README and release notes.

Thank you for contributing! 🎉
