const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy database
let products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 29.99,
    description: "Essential premium cotton t-shirt. Soft, breathable, and perfect for everyday wear.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 149.00,
    description: "Elegant timepiece with a genuine leather strap and minimal dial design.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
