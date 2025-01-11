# full-stack-task-management-app

## Overview
This project is a **Restaurant Order Management System** that allows users to:
- View the menu and Place orders for selected items.
- Manage their account through user authentication (login and registration).
- Add, edit, and delete menu items for all user(now).

This system is designed for a smooth user experience and provides real-time feedback when placing orders, managing menu items, or updating user profiles.

## Features

### 1. **User Authentication**
- **Login**: Users can log in using their username and password.
- **Registration**: New users can register by providing their details such as email, username, password.
- **JWT Authentication**: JSON Web Token (JWT) is used for secure authentication, ensuring that only logged-in users can place orders or modify their details.

### 2. **Menu Management**
- **View Menu**: All available menu items are displayed for users to browse.
- **Add Items**: Admin users can add new items to the menu, specifying their name, price, category, and availability.
- **Edit Items**: Admins can update menu items, including modifying their price, category, and availability.
- **Delete Items**: Admin users can remove items from the menu.

### 3. **Order Management**
- **Place Orders**: Users can place orders with one or more items, specifying the quantity of each.
- **Order History**: Users can track the status and details of all past orders.

### 4. **Real-Time Feedback**
- **Order Confirmation**: Once an order is placed successfully, users receive an immediate confirmation message.
- **Error Handling**: In case of any errors, users are notified promptly.

## Technologies Used

- **Frontend**: 
  - ReactJS (Functional Components, React Hooks, Context API)
  - React Router for navigation
  - Axios for API requests
  - JWT Authentication for secure login
  - Bootstrap for UI styling

- **Backend**:
  - Node.js
  - Express.js for routing and handling API requests
  - MongoDB for database storage (menu items, orders, user details)
  - JWT for authentication

## Installation

### 1. **Frontend Setup**

Clone the repository:

```bash
git clone https://github.com/ismaeelkhaleel/full-stack-task-management-app
cd frontend
npm install
npm install react-modal jwt-decode react-router-dom axios react-bootsrap
npm start
 ```
##Open new terminal 

```bash
cd backend
npm install
npm install express jsonwebtoken mongoose bcryptjs dotenv nodemon
nodemon server.js



