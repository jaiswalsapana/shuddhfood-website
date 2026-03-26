const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy database
let products = [
  {
    id: 1,
    name: "Jaggery",
    price: 90.00,
    description: "Jaggery is a type of unrefined sugar made from sugarcane juice or palm sap. It is used in various Indian dishes.",
    category: "Snacks",
    image: "https://shuddh-food.vercel.app/assets/jaggery.jpeg"
  },
  {
    id: 2,
    name: "Soya Chunks",
    price: 20.50,
    description: "High-protein, low-fat soya chunks made from defatted soy flour. A versatile ingredient perfect for curries, stir-fries, and snacks.",
    category: "Snacks",
    image: "https://shuddh-food.vercel.app/assets/soya-chunk.jpeg"
  },
  {
    id: 3,
    name: "Hing",
    price: 50.99,
    description: "Premium quality hing (asafoetida) with a pungent aroma and authentic flavor. Perfect for Indian cooking.",
    category: "Spices",
    image: "https://shuddh-food.vercel.app/assets/hing.jpeg"
  },
  {
    id: 4,
    name: "Peanut Chikki",
    price: 20.00,
    description: "Crunchy, sweet, and nutty peanut chikki made with jaggery and fresh peanuts. A traditional Indian brittle perfect for a quick energy boost.",
    category: "Snacks",
    image: "https://shuddh-food.vercel.app/assets/peannut-chiki.jpeg"
  },
  {
    id: 5,
    name: "Pink Rock Salt",
    price: 140.99,
    description: "Pink rock salt is a type of salt that is pink in color and is used in cooking and as a seasoning.",
    category: "Sweets",
    image: "https://shuddh-food.vercel.app/assets/pink-rock-salt.jpeg"
  },
  {
    id: 6,
    name: "Seviyan",
    price: 70.50,
    description: "Seviyan is a type of vermicelli made from wheat flour and is used in various Indian dishes.",
    category: "Spices",
    image: "https://shuddh-food.vercel.app/assets/seviyan.jpeg"
  },
  {
    id: 7,
    name: "Makhana",
    price: 80.99,
    description: "Traditional sweet and spicy mango pickle made with farm-fresh mangoes and sun-dried spices. A perfect accompaniment to any Indian meal.",
    category: "Snacks",
    image: "https://shuddh-food.vercel.app/assets/makhana.jpeg"
  },
  {
    id: 8,
    name: "Black Salt",
    price: 55.00,
    description: "Black salt is a type of salt that is black in color and is used in cooking and as a seasoning.",
    category: "Spices",
    image: "https://shuddh-food.vercel.app/assets/black-salt.jpeg"
  }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Add a product (admin)
app.post('/api/products', (req, res) => {
  const newProduct = { ...req.body, id: Date.now() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Delete a product (admin)
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Product deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
