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
   ```

## API Endpoints

### **Authentication APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/auth/register` | Register a new user |
| **POST** | `/auth/login` | User/Admin login (returns JWT token) |

### **User APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/user/profile` | Get user details (email, credits, etc.) |
| **POST** | `/user/request-credits` | Request additional credits from admin |

### **Document Scanning APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/scan` | Upload a document (text/file) for scanning |
| **GET** | `/matches/:docId` | Get matching documents for a given document |

### **Admin APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/admin/credit-requests` | Get pending credit requests (Admin Only) |
| **POST** | `/admin/approve-credit` | Approve a credit request |
| **POST** | `/admin/deny-credit` | Deny a credit request |
| **GET** | `/admin/analytics` | Get analytics (Total scans, credit usage, etc.) |

## API Calls and Responses

### **1️⃣ Register User**
**Request:**
```bash
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password123"}'
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

### **2️⃣ Login User/Admin**
**Request:**
```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email": "admin@example.com", "password": "adminpassword"}'
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "admin": true
}
```

### **3️⃣ Get User Profile**
**Request:**
```bash
curl -X GET http://localhost:3000/user/profile -H "Authorization: Bearer <token>"
```
**Response:**
```json
{
  "email": "user@example.com",
  "credits": 20
}
```

### **4️⃣ Upload Document for Scanning**
**Request:**
```bash
curl -X POST http://localhost:3000/scan -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"text": "Sample document text"}'
```
**Response:**
```json
{
  "matches": [
    {"docId": "123", "similarity": 0.85}
  ]
}
```

### **5️⃣ Get Matching Documents**
**Request:**
```bash
curl -X GET http://localhost:3000/matches/123 -H "Authorization: Bearer <token>"
```
**Response:**
```json
{
  "matches": [
    {"docId": "456", "similarity": 0.90}
  ]
}
```

### **6️⃣ Request Additional Credits**
**Request:**
```bash
curl -X POST http://localhost:3000/user/request-credits -H "Authorization: Bearer <token>"
```
**Response:**
```json
{
  "message": "Credit request submitted"
}
```

### **7️⃣ Admin - Get Pending Credit Requests**
**Request:**
```bash
curl -X GET http://localhost:3000/admin/credit-requests -H "Authorization: Bearer <admin-token>"
```
**Response:**
```json
{
  "requests": [
    { "id": "1", "email": "user1@example.com", "amount": 10 }
  ]
}
```

### **8️⃣ Admin - Approve Credit Request**
**Request:**
```bash
curl -X POST http://localhost:3000/admin/approve-credit -H "Authorization: Bearer <admin-token>" -H "Content-Type: application/json" -d '{"id": "1"}'
```
**Response:**
```json
{
  "message": "Credit request approved successfully."
}
```

### **9️⃣ Admin - Deny Credit Request**
**Request:**
```bash
curl -X POST http://localhost:3000/admin/deny-credit -H "Authorization: Bearer <admin-token>" -H "Content-Type: application/json" -d '{"id": "1"}'
```
**Response:**
```json
{
  "message": "Credit request denied."
}
```

### **🔹 Conclusion**
This backend system enables **secure document scanning and similarity detection** with an **automated credit-based usage model**. The **admin panel provides full control** over user requests and analytics, ensuring a **seamless experience for document processing**.
