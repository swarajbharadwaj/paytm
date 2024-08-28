const { userSchema, updateUser } = require('../types');
const { User, Account } = require('../db');
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const router = express.Router();
const zod = require('zod');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup', async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);

        if (!success) {
            return res.status(411).json({ message: 'Incorrect inputs' });
        }

        const userExists = await User.findOne({ username: req.body.username });

        if (userExists) {
            return res.status(411).json({ message: 'Email already taken' });
        }

        const user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        });
        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: 'Incorrect inputs' });
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return res.json({ token: token });
        }
        return res.status(411).json({ message: "Invalid username or password" });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/', authMiddleware, async (req, res) => {
    try {
        const { success } = updateUser.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: 'Error while updating information...' });
        }

        await User.updateOne({ _id: req.userId }, req.body);
        return res.status(200).json({ message: 'Updated successfully' });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/bulk', async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        return res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error('Error during bulk user retrieval:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
