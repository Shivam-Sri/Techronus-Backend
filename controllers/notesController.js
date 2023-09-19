import { Note } from '../models/Note.js';


export const createNote = async (req, res) => {
    try {
        const { title, text, currentauthor } = req.body;

        const newNote = new Note({
            title,
            text,
            currentauthor,
        });

        console.log(newNote);

        await newNote.save();

        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getNotes = async (req, res) => {
    try {
        // Get the user ID from the authenticated user
        // console.log(req);
        // const userId = req.user.id;

        // Find all notes associated with the user
        // const notes = await Note.find({ userId });
        const notes = await Note.find();
        // console.log(notes)
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateNote = async (req, res) => {
    const { title, text, currentauthor } = req.body;

    try {
        const updatedNote = await Note.findOneAndUpdate(
            { currentauthor, title },
            { text },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteNote = async (req, res) => {
    console.log('deleting note on backend')
    try {
        const { currentauthor, title } = req.body;
        console.log(currentauthor + '  ' + title);

        const deletedNote = await Note.findOneAndDelete({ currentauthor, title });
        console.log(deletedNote + ' is deleted')
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        console.log(res);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
