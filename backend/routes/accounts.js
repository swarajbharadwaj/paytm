const express = require('express');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const { to, amount } = req.body;

        // Check if the amount is valid
        if (amount <= 0) {
            return res.status(400).json({ message: "Invalid transfer amount" });
        }

        const account = await Account.findOne({ userId: req.userId });
        const toAccount = await Account.findOne({ userId: to });

        if (!toAccount) {
            return res.status(400).json({ message: "Recipient account doesn't exist" });
        }

        if (!account || account.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.error('Error during transfer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
