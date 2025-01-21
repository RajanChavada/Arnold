import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv with the path to your .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// After dotenv.config()
console.log('Current directory:', __dirname);
console.log('Environment variables:', {
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV
});

import express, { application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserInformation from '../model/Userinformation.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Log all environment variables for debugging
console.log("Environment Variables:", process.env); // Log all environment variables

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI; 
console.log("MongoDB URI:", mongoURI); // Log the URI
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const userSchema = new mongoose.Schema({
    selectedGoal: String,
    currentWeight: Number,
    goalWeightChange: Number,
    trainingIntensity: Number,
    age: Number,
    height: Number,
    });

const User = mongoose.model('User', userSchema);


// API endpoint to save user data
app.post('/api/signup', async (req, res) => {
    const { selectedGoal, currentWeight, goalWeightChange, trainingIntensity, age, height } = req.body;

    const newUser = new User({
      selectedGoal,
      currentWeight,
      goalWeightChange,
      trainingIntensity,
      age,
      height,
    });

    // console log

    console.log(newUser);

    try {
      await newUser.save();
      res.status(201).send('User data saved successfully');
    } catch (error) {
      res.status(400).send('Error saving user data');
    }
  });

// Add this route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API!'); // You can customize this message
  console.log("Working"); 
});

app.post('/api/signupnewuser', async (req, res) => {
    const {email, password} = req.body; 

    // check if the email and password are valid 
    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required'});
    }

    try {
        // Check if user already exists
        const existingUser = await UserInformation.findOne({ email });
        if (existingUser) {
            return res.status(400).json({error: 'Email already exists'});
        }

        // create new user in database
        const newDBUser = new UserInformation({
            email, 
            password, 
        });

        await newDBUser.save(); 
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({error: 'Error creating user'});
    }
});


app.post('/api/login', async (req, res) => {
    const {email, password} = req.body; 

    // check if the email and password are valid 
    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required'});
    }

    try {
        const user = await UserInformation.findOne({email, password}); 
        if (!user) {
            return res.status(401).json({error: 'Invalid email or password'});
        }

        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({error: 'Error logging in'});
    }
});

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });