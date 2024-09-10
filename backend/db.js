const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB with error handling
mongoose.connect('mongodb+srv://swaraj:admin@atlascluster.kiyfmeh.mongodb.net/');


// Define User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Define Account schema
const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        min: 0,  // Ensure balance is non-negative
    },
}, {
    timestamps: true
});

// Create models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountsSchema);

module.exports = {
    User,
    Account
};
