# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT open a public issue**
2. Email us at: gargpriyanshu2004@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment** within 48 hours
- **Initial assessment** within 1 week
- **Resolution timeline** based on severity
- **Credit** in release notes (if desired)

### Scope

In scope:
- Authentication/authorization flaws
- SQL injection
- XSS vulnerabilities
- Data exposure
- CSRF attacks

Out of scope:
- Rate limiting issues
- Denial of service
- Social engineering

## Security Best Practices

When deploying Ledger:

1. **Use strong JWT secrets** (32+ random characters)
2. **Enable HTTPS** in production
3. **Set secure environment variables**
4. **Keep dependencies updated**
5. **Use strong database passwords**
6. **Enable database SSL** in production

Thank you for helping keep Ledger secure!
