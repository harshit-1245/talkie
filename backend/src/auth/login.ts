import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { validateLogin } from '../configuration/validation';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = expressAsyncHandler(async (req, res) => {
    try {
        // Validate the login request body
        const { error } = validateLogin(req.body);
        if (error) {
            res.status(400).json({ message: 'Validation error', errors: error.details.map((d: any) => d.message) });
            return;
        }

        // Extract username and password from the request body
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            res.status(400).json({ message: "Please fill both fields" });
            return;
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "harry", { expiresIn: '1h' });

        // Send the token in response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
