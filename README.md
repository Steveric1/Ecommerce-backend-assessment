# Product Listing Assessment - Backend Implementation

## Overview

This submission focuses on the backend implementation of the Product Listing application.

My primary area of expertise is backend engineering, so I prioritized delivering a robust and scalable API that covers the core business requirements of the assessment. The backend provides authentication, product management, cart management, order creation, and image upload functionality.

While the assessment specification included both frontend and backend deliverables, I focused on delivering a complete backend solution within the available timeframe.

---

## Features Implemented

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Product Management

* Create Product
* Get All Products
* Get Product By ID
* Update Product
* Delete Product
* Product Image Upload via Cloudinary

### Cart Management

* Create or Retrieve User Cart
* Add Products to Cart
* Update Cart Totals Automatically
* Retrieve Cart Details

### Order Management

* Create Order From Cart
* Calculate Order Totals
* Convert Cart Items Into Orders

### Database

* MongoDB Integration using Mongoose
* Structured Models for:

  * Users
  * Products
  * Carts
  * Orders

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* Cloudinary
* Multer

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "email": "test@gmail.com",
  "password": "password"
}
```

#### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "test@gmail.com",
  "password": "password"
}
```

---

### Products

#### Get All Products

```http
GET /api/products
```

#### Get Product By ID

```http
GET /api/products/:id
```

#### Create Product

```http
POST /api/products
```

Form Data:

```text
name
description
price
category
image
```

#### Update Product

```http
PUT /api/products/:id
```

#### Delete Product

```http
DELETE /api/products/:id
```

---

### Cart

#### Get or Create Cart

```http
GET /api/get-or-create-cart
```

#### Add Product to Cart

```http
POST /api/cart/get-or-create-cart
```

Request Body:

```json
{
  "productId": "PRODUCT_ID",
  "quantity": 1
}
```

---

### Orders

#### Create Order From Cart

```http
POST /api/orders/from-cart
```

#### Get User Orders

```http
GET /api/orders
```
---

## Project Structure

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── config/
└── app.js
```

---

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd project-directory
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The server will start on:

```text
http://localhost:3000
```

---

## Notes

The assessment specification requested both frontend and backend deliverables. Given my stronger focus on backend engineering, I prioritized implementing a complete backend solution that demonstrates API design, authentication, database modeling, business logic, file uploads, and order management workflows.

The API has been structured to support integration with a React frontend and can be consumed directly using the documented endpoints above.

---

## Author

Eric Steve

Backend Engineer
