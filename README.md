# College Marketplace App

## Overview
This is a full-stack web application designed to facilitate online shopping within a college community. The platform consists of a **Seller Portal** and a **Student Portal**, providing a seamless marketplace experience.

## Technologies Used
- **Backend**: Express.js, MongoDB
- **Frontend**: React with Material UI

## Features
### Seller Portal
- **Store Registration**: Sellers can register their stores with essential details (name, address, contact information, operating hours).
- **Product Listing & Management**: Upload product catalogs, including descriptions, images, and prices.
- **Order Management**: Receive instant notifications upon receiving new orders, view order details, and update order status.
- **Transaction History**: View past orders and transactions, including payment details and customer information.
- **Max Purchases List**: Identify top student buyers to offer discount coupons.
- **Inventory Update**: Update inventory levels easily.

### Student Portal
- **User Registration & Login**: Students register using their college ID for security.
- **Product Browsing & Search**: Browse products by category, search for items, and view details.
- **Cart Management & Checkout**: Add items to the cart, review orders, and proceed with secure payments.
- **Order History**: Access past order details and transactions.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up MongoDB connection in `.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   npm run server
   ```
5. Start the frontend:
   ```sh
   npm start
   ```


## Future Enhancements
- Frontend and Backend are full functional independently..
- some api endpoints need to be integrated


