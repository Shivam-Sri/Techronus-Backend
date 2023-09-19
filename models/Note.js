import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: String,
    text: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    user_id: String,
    currentauthor: String
});

export const Note = mongoose.model('Note', noteSchema);
