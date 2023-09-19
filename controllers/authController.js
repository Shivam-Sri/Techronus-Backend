import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { secrets } from '../config/secrets.js';

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const userExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ username, password, email });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, '  ', password, '   ' + ' trying to login');
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const { username } = user;

        const token = jwt.sign({ id: user._id, email: user.email }, secrets.jwtSecret);


        return res.status(200).json({ token, email, username });
    } catch (error) {
        console.log(error, ' error occurred: ')
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const logoutUser = (req, res) => {

};
