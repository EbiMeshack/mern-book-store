# mern-book-store

A simple book store website using mern stack

# MERN Bookstore

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that functions as an online bookstore. Users can browse, add books to their cart, and make purchases, while admins can manage the books (CRUD operations).

# Features

### User Functionality:

- Browse available books
- Add books to cart
- Checkout process
- Manage cart (add/remove items)

### Admin Functionality:

- Add, edit, and delete books
- View and manage book inventory

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EbiMeshack/mern-book-store.git
   ```
2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

   Install Tailwind CSS using npm:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. Set up environment variables by creating a `.env` file in the `backend` directory:

   ```bash
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

4. Start the development server:

- For the backend:

  ```bash
  cd backend
  npx nodemon
  ```

- For the frontend:
  ```bash
  cd frontend
  npm run dev
  ```

## Thats it your website is ready to use ✨
