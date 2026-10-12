# ShopSphere — E-commerce Website

ShopSphere is a full-stack e-commerce demo built with React, Node.js, Express, and MongoDB.

## Features

- Product listing from MongoDB
- Search products by name
- Filter products by category
- Add products to the shopping bag
- Update item quantities
- Calculate the cart total
- Remove items from the cart
- REST API for creating, reading, updating, and deleting products

## Tech Stack

- Frontend: React and Vite
- Backend: Node.js and Express
- Database: MongoDB with Mongoose
- API testing: Postman

## Run Locally

### Backend

1. Open the `ecommerce-backend` folder.
2. Install dependencies:

   `npm install`

3. Create a `.env` file containing:

   `PORT=5005`

   `MONGODB_URI=your_mongodb_connection_string`

4. Start the backend:

   `npm run dev`

### Frontend

1. Open the `ecommerce-app` folder in a separate terminal.
2. Install dependencies:

   `npm install`

3. Start the frontend:

   `npm run dev`

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Notes

This is a learning project. Checkout is currently a demo; real payment processing is not connected.