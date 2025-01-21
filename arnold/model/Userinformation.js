import mongoose from 'mongoose';

const userinformation = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const UserInformation = mongoose.model('UserInformation', userinformation);

export default UserInformation;