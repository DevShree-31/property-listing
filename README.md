# 🏠 Property Listing Backend System

This project is a backend system designed to manage real estate property listings. It offers a robust set of features including user authentication, CRUD operations for properties, advanced filtering, a favorites system, and property recommendations.

## 📌 Features

- **User Registration and Login**: Secure authentication using email and password
- **CRUD Operations**: Create, read, update, and delete property listings
- **Owner-Only Access**: Property updates and deletions are restricted to the property owner
- **Advanced Filtering**: Filter properties based on 10+ attributes (e.g., price, location, size)
- **Favorites System**: Users can add or remove properties to/from their favorites list
- **Performance Optimization**: Caching implemented with Redis
- **Recommendation System**:  property recommendations for users by other users

## 📦 Tech Stack

- **Backend**: TypeScript, Node.js (using  Express framework)
- **Database**: MongoDB for storing property and user data
- **Cache**: Redis for fast data retrieval
- **Authentication**: JWT (JSON Web Token) based authentication
- **Deployment**: Hosted on Render  

## 🛠 Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/DevShree-31/property-listing
cd property-listing-backend
```


### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Open the `.env` file in a text editor and add your configuration details, such as:
- MongoDB connection string
- Redis connection string
- JWT secret key

**Example `.env` content:**

```env
MONGODB_URI=mongodb://localhost:27017/property-listing
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
PORT=5000
```

### 4. Run the Application

```bash
npm run start
```

The server should now be running locally, typically on `http://localhost:5000`.

## 📖 API Documentation

Explore and test the API endpoints using Swagger:

- **Deployed Version**: [https://property-listing-3-ml5n.onrender.com/api-docs/](https://property-listing-3-ml5n.onrender.com/api-docs/)
- **Local Development**: `http://localhost:5000/api-docs/` (adjust the port if necessary)

## 🔗 Key Endpoints

### Authentication
- `POST /api/v1/auth/register`: Create a new user account
- `POST /api/v1/auth/login`: Log in and receive a JWT token

### Favorites
- `GET /api/v1/favorite`: Retrieve the signed-in user's favorite properties
- `POST /api/v1/favorite/{id}`: Add a property to the user's favorites
- `DELETE /api/v1/favorite/{id}`: Remove a property from the user's favorites

### Properties
- `POST /api/v1/property`: Create a new property listing
- `GET /api/v1/property`: Fetch all properties (supports optional filters)
- `GET /api/v1/property/{id}`: Retrieve a specific property by ID
- `PATCH /api/v1/property/{id}`: Update a property (owner only)
- `DELETE /api/v1/property/{id}`: Delete a property (owner only)

### Recommendations
- `POST /api/v1/recommendations`: Send a property recommendation to a user
- `GET /api/v1/recommendations`: View recommendations received by the authenticated user

## 🔐 Authentication

Most endpoints require a JWT token for access. Include it in the `Authorization` header like this:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```



## 📄 License

This project is licensed under the MIT License.
