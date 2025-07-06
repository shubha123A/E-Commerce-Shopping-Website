const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Update this if your frontend runs elsewhere
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.options('*', cors());

// Parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://sshubha198:abhiraki123@cluster0.kyyf03a.mongodb.net/Shopping?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Ensure uploads folder exists
const dir = 'upload/images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });
app.use('/images', express.static('upload/images'));

// Routes
app.get('/', (req, res) => {
    res.send("Express App is Running 🚀");
});

// Upload product image
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Product schema and model
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

// Add product
app.post('/add-product', async (req, res) => {
    try {
        const products = await Product.find({});
        const id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

        const product = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({ success: true, message: 'Product added successfully!', product });
    } catch (error) {
        console.error('❌ Error adding product:', error);
        res.status(500).json({ success: false, message: 'Error adding product', error: error.message });
    }
});

// Remove product
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({ success: true, message: `Product '${req.body.name}' removed successfully!` });
    } catch (error) {
        console.error('❌ Error removing product:', error);
        res.status(500).json({ success: false, message: 'Error removing product', error: error.message });
    }
});

// Get all products
app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// User schema and model
const users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

// Signup
app.post('/signup', async (req, res) => {
    try {
        let check = await users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');

        res.json({ success: true, token });
    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Wrong email address" });
        }

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success: false, errors: "Wrong password" });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');

        res.json({ success: true, token });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
