// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// load environment variables from .env file
dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

// middleware
// app.use(cors({
//   origin: "*",
//   methods: "GET,POST,PUT,DELETE",
//   allowedHeaders: "Content-Type, Authorization",
//   credentials: true
// }));
// app.use(express.json());
const allowedOrigins = [
    'http://localhost:5000', // local dev
    'https://task-manager-new-ochre.vercel.app/' // deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow requests with no origin (Postman, server-to-server)
        if (allowedOrigins.includes(origin)) {
            callback(null, true); // allow this origin
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(express.json());


// routes
app.use('/api/auth', require('./routes/authRoutes'));
// task routes
app.use('/api/tasks', require('./routes/taskRoutes'));


// test route
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

