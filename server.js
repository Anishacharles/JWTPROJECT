const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoutes');
const connectDB=require("./config/db")


dotenv.config();
const app = express();


const PORT = process.env.PORT || 4010;

connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users',userRoute); // Make sure the path matches the one you're using

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

