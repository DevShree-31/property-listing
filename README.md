# 🏠 Property Listing Backend System

This project is a backend system for managing real estate property listings. It includes user authentication, CRUD operations for properties, advanced filtering, favorites, and recommendations.

## 📌 Features

- User registration and login with email/password
- CRUD operations on properties
- Property visibility limited to the owner for update/delete
- Advanced filtering on 10+ property attributes
- Favorite system (add/remove favorite properties)
- Caching using Redis for performance optimization
-  Property recommendation system

## 📦 Tech Stack

- **Backend**: TypeScript, Node.js (NestJS/Express)
- **Database**: MongoDB
- **Cache**: Redis
- **Auth**: JWT-based authentication
- **Deployment**: Render / Vercel (free tier)



## 🛠 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/property-listing-backend.git
cd property-listing-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# property-listing
