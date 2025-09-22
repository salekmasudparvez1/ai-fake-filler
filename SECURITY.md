# 🔒 Security Policy

## 🛡️ Supported Versions

We actively support the following versions of AI Fake Filler:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | ✅ Yes             |
| 1.0.x   | ❌ No              |

## 🚨 Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 📧 Private Disclosure
**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please:
1. Email security concerns to the maintainer
2. Or open a [private security advisory](https://github.com/salekmasudparvez1/ai-fake-filler/security/advisories/new)
3. Provide detailed information about the vulnerability

### ℹ️ What to Include
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fixes (if any)

### ⏱️ Response Timeline
- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Resolution**: Varies based on complexity

## 🔐 Security Features

### API Key Protection
- ✅ API keys stored in Chrome's encrypted sync storage
- ✅ Keys never logged or transmitted to unauthorized endpoints
- ✅ Local storage only - no cloud storage of credentials

### Data Privacy
- ✅ No user data collection or tracking
- ✅ No analytics or telemetry
- ✅ Generated data is not stored or transmitted elsewhere
- ✅ Only communicates with Google's Gemini API

### Extension Security
- ✅ Minimal permissions requested
- ✅ Content Security Policy implemented
- ✅ No eval() or unsafe-inline scripts
- ✅ Manifest V3 compliance for enhanced security

### Network Security
- ✅ HTTPS-only communication
- ✅ Limited to specific API endpoints
- ✅ No third-party tracking scripts
- ✅ Secure API key transmission

## 🔍 Security Audit

This extension has been designed with security best practices:
- Secure storage of sensitive data
- Minimal permission model
- Modern Chrome extension architecture
- No data exfiltration vectors

## 📋 Security Checklist for Contributors

When contributing, please ensure:
- [ ] No hardcoded API keys or secrets
- [ ] No eval() or dynamic code execution
- [ ] Proper input validation and sanitization
- [ ] HTTPS-only external requests
- [ ] Minimal permission requirements
- [ ] No unnecessary data storage

## 🤝 Responsible Disclosure

We appreciate responsible disclosure of security vulnerabilities. Security researchers who report valid vulnerabilities will be:
- Credited in our security acknowledgments (with permission)
- Notified when fixes are released
- Invited to verify fixes before public release

---

**For any security-related questions or concerns, please reach out through appropriate private channels.**