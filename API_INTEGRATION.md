# API Integration Documentation

This document provides a comprehensive overview of all API integrations in the ecommerce frontend.

## API Base URL Configuration

The API base URL is configured via environment variables in `.env`:
```
VITE_API_BASE_URL=http://157.230.254.81:8001
```

All API calls are built using `buildApiUrl()` utility from `src/config/api.js`

## API Utilities

### 1. Authentication (`src/config/auth.js`)
Provides authentication-related API calls and local storage management.

**Functions:**
- `authAPI.login(email, password)` - POST `/api/auth/login`
- `authAPI.signup(name, email, password)` - POST `/api/auth/signup`
- `authAPI.logout()` - GET `/auth/logout`

**Storage Helpers:**
- `authStorage.setToken(token)` - Store auth token
- `authStorage.getToken()` - Retrieve auth token
- `authStorage.setUser(user)` - Store user info
- `authStorage.getUser()` - Retrieve user info
- `authStorage.clear()` - Clear all auth data

### 2. Products (`src/config/product.js`)
Provides product-related API calls for browsing and management.

**Functions:**
- `productAPI.getAllProducts()` - GET `/products`
- `productAPI.getProductById(id)` - GET `/products/{product_id}`
- `productAPI.getProductsByType(type)` - GET `/products_by_type/{type}`
- `productAPI.getFeaturedProducts()` - GET `/featured_products`
- `productAPI.getRecommendedProducts()` - GET `/recommended_products`
- `productAPI.searchProducts(query)` - GET `/search?q={query}`
- `productAPI.getCategories()` - GET `/categories`
- `productAPI.createProduct(productData, token)` - POST `/api/admin/products`

## Component Integrations

### 1. LoginPage (`src/pages/LoginPage.jsx`)
**Integration:** Connects to `POST /api/auth/login` endpoint

**Features:**
- Email and password input fields
- Form validation
- Error and success messages
- Loading state handling
- Stores auth token and user info on successful login
- Redirects to home page after login

**State Management:**
- Email, password, loading, error, success states
- Uses `authAPI.login()` and `authStorage` utilities

### 2. SignupPage (`src/pages/SignupPage.jsx`)
**Integration:** Connects to `POST /api/auth/signup` endpoint

**Features:**
- Full name, email, and password input fields
- Form validation including password length check
- Error and success messages
- Loading state handling
- Stores auth token and user info on successful signup
- Redirects to home page after signup

**State Management:**
- Name, email, password, loading, error, success states
- Uses `authAPI.signup()` and `authStorage` utilities

### 3. AddProductPage (`src/pages/AddProductPage.jsx`)
**Integration:** Connects to `POST /api/admin/products` endpoint

**Features:**
- Product form with fields: name, category, price, stock, image URL, description
- Form validation for all fields
- Loading state during submission
- Error and success messages
- Authentication token verification
- Redirects to home page after successful product creation

**State Management:**
- Form data state for all product fields
- Loading, error, success states
- Uses `productAPI.createProduct()` and `authStorage.getToken()`

### 4. Header (`src/components/Header.jsx`)
**Integration:** Connects to `GET /categories` endpoint

**Features:**
- Dynamically loads categories from API
- Category dropdown for search filtering
- Search query input
- Redirects to product listing with search params

**State Management:**
- Query, selected category, dropdown visibility states
- Uses `productAPI.getCategories()`

### 5. ProductListing (`src/components/ProductListing.jsx`)
**Integration:** Connects to `GET /products` endpoint

**Features:**
- Loads all products from API
- Filters by search query and category
- Pagination support
- Grid/List view toggle
- Error handling with fallback states

**State Management:**
- API products, loading, error states
- Uses `productAPI.getAllProducts()`

### 6. ProductDetails (`src/components/ProductDetails.jsx`)
**Integration:** Connects to `GET /products/{product_id}` endpoint (with fallback to `GET /products`)

**Features:**
- Fetches specific product by ID
- Displays product details including price, stock, ratings, description
- Thumbnail gallery
- Size selection
- Related actions (Buy Now, Add to Cart, Wishlist)

**State Management:**
- Product, loading, error, selected thumbnail states
- First tries specific product endpoint, falls back to fetching all products
- Uses `productAPI.getProductById()` and `productAPI.getAllProducts()`

### 7. App/HomePage (`src/App.jsx`)
**Integration:** Connects to `GET /products_by_type/{type}` endpoint

**Features:**
- Loads products by category type (home_outdoor, tech)
- Displays featured product sections
- Normalizes product data from API response
- Fallback to static data if API fails

**State Management:**
- Home and outdoor items, tech items states
- Uses `productAPI.getProductsByType()`

## Available API Endpoints

### Authentication
- `GET /auth/signup` - Get signup page
- `POST /auth/signup` - Submit signup form
- `GET /auth/login` - Get login page
- `POST /auth/login` - Submit login form
- `GET /auth/logout` - Logout user
- `POST /api/auth/signup` - API signup
- `POST /api/auth/login` - API login

### Products
- `GET /products` - Get all products
- `GET /products/{product_id}` - Get specific product
- `GET /products_by_type/{type}` - Get products by type
- `GET /featured_products` - Get featured products
- `GET /recommended_products` - Get recommended products
- `GET /search?q={query}` - Search products
- `GET /categories` - Get all categories

### Admin
- `GET /admin/products` - Admin products page
- `GET /admin/add-product` - Add product page
- `POST /admin/add-product` - Create product
- `POST /api/admin/products` - API create product

## Error Handling

All API utilities implement:
1. HTTP status code checking
2. JSON parsing with fallback error messages
3. Try-catch error handling
4. User-friendly error messages in components
5. Graceful degradation with fallback data

## Authentication Token Storage

Auth tokens are stored in localStorage with key `auth_token`. They should be included in API requests to authenticated endpoints:

```javascript
const token = authStorage.getToken();
headers['Authorization'] = `Bearer ${token}`;
```

## Environment Configuration

Create a `.env` file in the project root:
```
VITE_API_BASE_URL=http://157.230.254.81:8001
```

The frontend will automatically use this URL for all API requests.
