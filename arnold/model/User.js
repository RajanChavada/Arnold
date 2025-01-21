// define user model
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    selectedGoal: { type: String, required: true },
    currentWeight: { type: Number, required: true },
    goalWeightChange: { type: Number, required: true },
    trainingIntensity: { type: Number, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;