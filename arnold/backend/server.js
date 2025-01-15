import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI; 
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

app.get('/api/signup', (req, res) => {
  res.send('Welcome to the API! signup'); // You can customize this message
  console.log("Working"); 
});


  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });