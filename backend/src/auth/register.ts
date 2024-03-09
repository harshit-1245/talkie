import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { validateRegistration } from '../configuration/validation';
import User from '../models/user'; // Assuming this imports your User model


export const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
      res.status(400).json({ message: 'Validation error', errors: error.details.map((d: any) => d.message) });
      return; // Return here to avoid execution of further logic
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return; // Return here to avoid execution of further logic
    }

    // Create a new user without password
    const newUser = new User({ email, username,password });

    // Generate auth token
    const authToken: string = await newUser.generateAuthToken();

    // Save the new user to the database
    await newUser.save();

    // Set auth token as cookie
    res.cookie('authToken', authToken, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours expiration
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict' // Adjust sameSite attribute as per your requirements
    });

    // Retrieve the created user without password
    const createdUser = await User.findById(newUser._id).select('-password');

    // Send success response
    res.status(201).json({ message: 'User created successfully', user: createdUser });
  } catch (err: any) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
