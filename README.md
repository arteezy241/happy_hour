# happy_hour
School project :)

🍷 Happy Hour Liquors - Full Stack E-Commerce
A modern, full-stack e-commerce application for browsing and purchasing premium spirits. Built with a React frontend and a Node.js/Express backend, powered by a PostgreSQL database.

🚀 Live Demo
Store URL: https://happy-hour-shop.onrender.com

API URL: https://happy-hour-moxu.onrender.com

🛠️ Tech Stack
Frontend (Client)
React: UI Component library.

TypeScript: For type-safe code.

Tailwind CSS: For styling and Dark Mode.

Vite: Super-fast build tool.

TanStack Query: For fetching API data.

Wouter: For lightweight routing.

Backend (Server)
Node.js & Express: RESTful API server.

Drizzle ORM: For interacting with the database.

PostgreSQL: Relational database (Hosted on Render).

Passport.js: For authentication handling.

✨ Features
🛒 Shopping Cart: Add items, adjust quantities, and persist cart state across sessions.

🌙 Dark Mode: Fully responsive dark/light theme toggle.

🔍 Product Search & Filter: Filter by categories (Tequila, Whiskey, Wine) and search by name.

📱 Responsive Design: Works perfectly on mobile and desktop.

🗄️ Database Seeding: Automatically populates the database with products if empty.

⚙️ Project Structure
The project uses a monorepo-style structure:
happy_hour/
├── project-export/
│   ├── client/          # Frontend React App
│   │   ├── src/pages/   # Home, Shop, ProductDetail, Cart
│   │   └── src/lib/     # API fetchers and Context
│   ├── server/          # Backend Node API
│   │   ├── routes.ts    # API Endpoints
│   │   ├── storage.ts   # Database Logic (Drizzle)
│   │   └── index.ts     # Server Entry Point
│   ├── shared/          # Shared Types & Schema
│   └── package.json     # Root dependencies

🚀 Local Setup & Installation
Follow these steps to run the project on your own machine.

1. Clone the Repository
   BASH
git clone https://github.com/arteezy241/happy_hour.git
cd happy_hour/project-export
2. Install Dependencies
  Bash
npm install
3. Configure Environment
Create a .env file in the project-export folder (or server folder depending on setup):

Code snippet

DATABASE_URL="postgresql://user:password@localhost:5432/your_local_db"
4. Run Database Migrations
Build the tables in your local database:

Bash

npx drizzle-kit push
5. Start the Development Server
This runs both the frontend and backend in development mode:

Bash

npm run dev
Open http://localhost:5000 to view the app.

📡 API Endpoints
The backend provides the following REST API endpoints:
Method	Endpoint	Description
GET	/api/products	Get all products (supports ?category= & ?search=)
GET	/api/products/:id	Get details for a single product
GET	/api/categories	Get list of all categories
GET	/api/cart/:sessionId	Get cart items for a user session
POST	/api/cart	Add an item to the cart
PATCH	/api/cart/:id	Update item quantity
DELETE/api/cart/:idRemove an item from the cart


☁️ Deployment Guide (Render)
This project is deployed using Render with two separate services:

1. Backend (Web Service)
Root Directory: project-export

Build Command: npm install

Start Command: node dist-server/index.js

Env Vars: DATABASE_URL (Connection string from Render PostgreSQL)

2. Frontend (Static Site)
Root Directory: project-export/client

Build Command: npm install && npm run build

Publish Directory: dist

Env Vars: VITE_API_BASE_URL (The URL of your live Backend service)

Made with ❤️ by Arteezy
