# Smartcart - Modern MERN Clothing E-Commerce

## Overview
Smartcart is a production-ready clothing e-commerce platform built with the MERN stack. It includes customer shopping flows, Stripe checkout, order tracking, and a role-based admin dashboard.

## Features
- JWT auth: register, login, logout, protected routes
- Product catalog with pagination, search, filters, sorting
- Product details with image gallery, reviews, related products, size/color selectors
- Cart management and Stripe checkout session flow
- Order confirmation and user order history with payment/order statuses
- Admin dashboard with product CRUD, user management, order status management
- Dark mode with localStorage persistence
- Responsive modern Tailwind UI, mobile filter drawer, hamburger menu
- About, Contact, FAQ, 404, newsletter UI, loading skeletons, toast notifications

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router, Context API, Axios
- Backend: Node.js, Express, MongoDB + Mongoose, JWT, Stripe

## Folder Structure
```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  data/
  scripts/
frontend/
  src/
    components/
    pages/
    context/
    hooks/
    utils/
```

## Setup Instructions
1. Clone repository and open root folder.
2. Create environment files:
   - `backend/.env` from `backend/.env.example`
   - `frontend/.env` from `frontend/.env.example`
3. Install dependencies:
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
4. Seed products:
   - `cd backend`
   - `npm run seed`
5. Start development:
   - Backend: `npm run dev`
   - Frontend: `cd ../frontend && npm run dev`

## Seed Script
- File: `backend/scripts/seedProducts.js`
- Inserts 28 realistic clothing products into MongoDB.
- Run with: `npm run seed` from the `backend` directory.

## Admin Access
Admin account is auto-bootstrapped on backend startup (when DB is connected):
- Email: `aazan3045@gmail.com`
- Password: `korejoazan12`

You can override this in `backend/.env`:
```env
ADMIN_NAME=Smartcart Admin
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-strong-password
```

Optional manual promotion is still available:
- `cd backend`
- `npm run make-admin -- your-email@example.com`

## Environment Variables Example
### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://aazan3045_db_user:<db_password>@cluster0.ofpozlx.mongodb.net/smartcart?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Smartcart Admin
ADMIN_EMAIL=aazan3045@gmail.com
ADMIN_PASSWORD=korejoazan12
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## Demo Credentials
- User:
  - Email: `demo@smartcart.com`
  - Password: `Demo@12345`
- Admin:
  - Email: `admin@smartcart.com`
  - Password: `Admin@12345`

Create these in your own DB or use your preferred seed users.

## Vercel Deployment Notes
- Frontend is Vercel-ready with `frontend/vercel.json` SPA rewrites.
- Backend includes `backend/vercel.json` for Node deployment.
- Set production env variables in Vercel project settings.
- Ensure `CLIENT_URL` and `VITE_API_URL` point to deployed domains.

## Screenshots
Add screenshots to a `screenshots/` folder and reference here:
- Home page
- Product listing
- Product details
- Cart + checkout
- Admin dashboard
