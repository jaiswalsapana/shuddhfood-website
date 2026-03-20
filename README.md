# Homemade React eCommerce

This is a modern eCommerce website built using React (Vite) and Tailwind CSS with a clean, premium design aesthetic.

## Folder Structure

```
homemade-react/
├── frontend/             # React + Vite application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, ProductCard, CartItem)
│   │   ├── context/      # React Context API for Cart State Management
│   │   ├── data/         # Dummy JSON data mimicking a database
│   │   ├── pages/        # Route pages (Home, Cart, Checkout, etc.)
│   │   ├── App.jsx       # Main App Routing
│   │   ├── index.css     # Global Tailwind CSS directives
│   │   └── main.jsx      # React entry file
│   └── tailwind.config.js# Tailwind Configuration
└── backend/              # Node.js + Express backend (for future usage)
    ├── package.json
    └── server.js         # Basic mock API server to replace local JSON
```

## Setup & Run Instructions

### 1. Run the Frontend (UI)

1. Open your terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (already done if initialized by this agent):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 2. How to Replace Local Data with a Real Backend API Later

Right now, the app relies on `src/data/products.json` and uses `setTimeout()` in components to simulate "fetching" from an API.

When you are ready to connect to a real backend (like Node.js, Firebase, or Django), follow these steps:

#### Step 1: Remove `products.json` Mock Imports
In files like `Home.jsx`, `ProductList.jsx` and `ProductDetails.jsx`, remove the local dummy data import:
```javascript
// Remove this line
import productsData from '../data/products.json';
```

#### Step 2: Use Native `fetch()` or `axios`
Inside your React `useEffect()` hooks, fetch your data directly from your backend URL (e.g. `http://localhost:5000/api/products`):

**Before (Mock API):**
```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    setProducts(productsData); // Local data
    setLoading(false);
  }, 800);
  return () => clearTimeout(timer);
}, []);
```

**After (Real API):**
```javascript
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  fetchProducts();
}, []);
```

#### Step 3: Run the Dummy Backend Server
I have provided a simple Express server inside the `backend` folder as an example. To run it:
```bash
cd backend
npm install
node server.js
```
This runs on port `5000` and creates the endpoints you can fetch using the `After` example above!
