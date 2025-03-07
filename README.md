# eCommerce Store

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Routes](#routes)
- [Form Validation](#form-validation)
- [Contributing](#contributing)
- [License](#license)

## Overview
This is a fully functional eCommerce store built with **React** and **React Router**. It features product browsing, a cart system, a checkout process, and a contact form with validation. The project ensures a **responsive design** and uses **CSS Modules** for styling.

## Features
- **Homepage** with product listings and a look-ahead search bar.
- **Product Page** displaying product details, reviews, and an "Add to Cart" button.
- **Cart Page** listing all selected products with total price calculation.
- **Checkout Page** allowing order placement.
- **Checkout Success Page** confirming the purchase and clearing the cart.
- **Contact Page** with form validation.
- **Navigation Bar** with a cart icon showing the number of items.
- **Responsive Design** using CSS Modules.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ecommerce-store.git

2. Navigate to the project directory:
   ```sh
   cd ecommerce-store

3. Install dependences:
   ```sh
   npm install

4. Start the development server:
   ```sh
   npm start

## Usage
- Browse products on the Homepage.
- Use the Search Bar to find products quickly.
- Click on a product to view details.
- Add products to the cart.
- Go to the Cartpage and proceed to Checkout.
- After checkout, the Checkout Success Page confirms the purchase and clears the cart.
- Use the Contact Page to send a message.

## Project Structure
src/
│── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Layout.js
│   ├── CartIcon.js
│── pages/
│   ├── HomePage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── CheckoutSuccessPage.js
│   ├── ContactPage.js
│── context/
│   ├── CartContext.js
│── styles/
│   ├── App.module.css
│   ├── Header.module.css
│   ├── Footer.module.css
│── App.js
│── index.js

## Technologies Used
- React
- React Router
- CSS Modules
- Fetch API for product data

## Routes

| Path              | Description                          |
|------------------|----------------------------------|
| `/`              | Homepage with product listings and search |
| `/product/:id`   | Individual product page |
| `/cart`          | Shopping cart page |
| `/checkout`      | Checkout page |
| `/checkout-success` | Order confirmation page |
| `/contact`       | Contact form page |

## Form Validation

The **Contact Page** form includes the following validation rules:

- **Full name:** Minimum 3 characters, required
- **Subject:** Minimum 3 characters, required
- **Email:** Must be a valid email, required
- **Message:** Minimum 3 characters, required

## Contributing

Feel free to submit pull requests or report issues. Contributions are welcome!

## License

This project is licensed under the **MIT License**.
