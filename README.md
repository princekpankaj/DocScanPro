# Document Scanning and Matching System

This project is a web-based application that allows users to scan documents and find similar text matches using a text similarity algorithm. It includes a credit system to limit scans per day and an admin interface for managing additional credit requests.

## Features
- User registration and JWT-based login authentication.
- Upload or input document text to scan for similar content (uses Levenshtein distance to find text similarity).
- 20 free scans per user per day; users can request more credits if needed.
- Admin panel to approve or reject users' credit requests.
- SQLite database for storing user accounts and documents.

## Technologies
- **Front-end:** HTML, CSS, JavaScript.
- **Back-end:** Node.js, Express, SQLite.
- **Auth:** JSON Web Tokens (JWT) for session-less auth.
- **Text Matching:** Levenshtein distance algorithm for string similarity.

## Setup Instructions

1. **Clone the repository** (or download the project folder):
   ```bash
   git clone https://github.com/princekpankaj/DocScanPro.git
   cd DocScanPro
