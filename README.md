# Pingaara

A full stack web application for Pingaara, a coastal seafood restaurant rooted in heritage and committed to serving fresh, handpicked seafood every day.

---

## About the Project

Pingaara is a restaurant website built as a school project using the MERN stack. The application includes a visually rich frontend inspired by coastal aesthetics, a secure authentication system, an online ordering flow, and an admin panel for menu management.

---

## Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- GSAP

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Features

- Animated intro screen with rotating rice grain effect
- Smooth scrolling single page experience
- Interactive magnetic text effect on the About section
- Auto scrolling image gallery
- Interactive wave pattern with scattering rice grains in the footer
- User registration and login with JWT authentication
- Online ordering system
- Admin panel for managing the menu
- Fully responsive design

---

## Project Structure

```
pingaara/
├── client/                  
│   └── src/
│       ├── assets/          
│       ├── components/      
│       ├── hooks/           
│       └── pages/           
└── server/                  
    ├── controllers/         
    ├── middleware/          
    ├── models/              
    └── routes/              
```

---

## Getting Started

### Prerequisites

- Node.js v18 or above
- MongoDB Atlas account
- npm

### Installation

**Clone the repository**

```bash
git clone https://github.com/neelima-bhaktha/pingaara.git
cd pingaara
```

**Set up the backend**

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run dev
```

**Set up the frontend**

```bash
cd ../client
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive a JWT token |

### Menu
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/menu | Get all menu items |
| POST | /api/menu | Add a new menu item (admin only) |
| PUT | /api/menu/:id | Update a menu item (admin only) |
| DELETE | /api/menu/:id | Delete a menu item (admin only) |

### Orders
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/orders | Place a new order |
| GET | /api/orders | Get all orders (admin only) |

---

## Deployment

The frontend is deployed on Vercel and the backend will be hosted on Render once complete. The database is hosted on MongoDB Atlas.

Live URL: [pingaara-nngx.vercel.app](https://pingaara-nngx.vercel.app)

---

## Author

Designed and developed by Neelima Bhaktha as part of a school project.
