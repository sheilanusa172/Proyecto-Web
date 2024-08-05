import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombreDelJuego: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    puntuacion: { type: Number, required: true }
});

export default mongoose.model('Product', productoSchema);
