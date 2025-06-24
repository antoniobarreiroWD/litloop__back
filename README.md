# LitLoop Backend

LitLoop is a backend service for a book-related application that provides authentication, book management, user management, and translation features.

## Features

- 📚 Book management system
- 🔐 User authentication and authorization
- 👤 User profile management
- 🌐 Translation service integration
- ⚡ Rate limiting for API protection
- 🔒 JWT-based authentication
- 📝 MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- JWT for token-based authentication
- Axios for HTTP requests

## Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/litloop__back.git
cd litloop__back
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `GET /api/books/:id` - Get a specific book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Translation
- `POST /api/translate` - Translate text

## Project Structure

```
├── app.js              # Application entry point
├── server.js           # Server configuration
├── config/             # Configuration files
├── controllers/        # Route controllers
├── db/                 # Database connection and configuration
├── middleware/         # Custom middleware
├── models/            # Database models
├── passport/          # Authentication strategies
├── routes/            # API routes
├── services/          # Business logic
└── utils/             # Utility functions
```

## Security Features

- JWT-based authentication
- Rate limiting to prevent abuse
- Password encryption
- Protected routes
- Session management

## Error Handling

The application includes a centralized error handling system that:
- Handles all types of errors uniformly
- Provides meaningful error messages
- Includes proper HTTP status codes
- Logs errors for debugging

