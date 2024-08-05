import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Invalid email address']
    },
    mensaje: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
