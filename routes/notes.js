import express from 'express';
import passport from 'passport';
import { createNote, getNote, getNotes, updateNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.post('/create', createNote);
router.post('/getNote', getNote);
router.get('/getNotes', getNotes);
router.delete('/delete', deleteNote);
router.post('/update', updateNote);

export default router;