import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', passport.authenticate('jwt', { session: false }), logoutUser);

export default router;