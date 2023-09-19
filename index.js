// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import { connectToDatabase } from './config/db.js';
import './config/passport.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

connectToDatabase();

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});