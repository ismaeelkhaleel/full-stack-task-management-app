import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exist' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const login = async (req, res) => {

    const { username, password } = req.body;

    try {

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.status(200).json({ message: 'Login Successull', token, user: {username:user.username, id:user._id} });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }

};