ShopSphere — Full-Stack E-Commerce Website

ShopSphere is a full-stack e-commerce demo built using React, Node.js, Express, and MongoDB.

Features

* Display products fetched from the database
* Search products by name
* Filter products by category
* Add products to the shopping bag
* Increase or decrease product quantities
* Calculate the shopping bag total
* Remove products from the bag
* REST API for product creation, reading, updating, and deletion

Tech Stack

* Frontend: React and Vite
* Backend: Node.js and Express
* Database: MongoDB with Mongoose
* API Testing: Postman

Project Structure

ShopSphere/
├── ecommerce-app/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
├── ecommerce-backend/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md

Getting Started

1. Backend Setup

Open a terminal inside ecommerce-backend and install dependencies:

npm install

Create a .env file containing your own MongoDB connection string:

PORT=5005
MONGODB_URI=your_mongodb_connection_string

Start the backend:

npm run dev

The backend runs at http://localhost:5005.

2. Frontend Setup

Open a separate terminal inside ecommerce-app and install dependencies:

npm install

Start the frontend:

npm run dev

Open the local URL displayed in the terminal.

API Endpoints

Method	Endpoint	Description
GET	/api/products	Fetch all products
GET	/api/products/:id	Fetch one product
POST	/api/products	Add a product
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product

Important Notes

* Keep your MongoDB connection string and credentials private.
* The .env file should not be uploaded to GitHub.
* Checkout is currently a demo; real online payments are not connected.

Project Purpose

This project demonstrates a basic full-stack e-commerce application with a React frontend, Express REST API, and MongoDB database.