import Comment from '../models/comment.model.js';

export const addComment = async (req, res) => {
    const { nombreCompleto, email, mensaje } = req.body;
    try {
        const newComment = new Comment({
            nombreCompleto,
            email,
            mensaje
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
