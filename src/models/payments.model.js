import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  nombre: { type: String, 
    required: true 
  },
  numerodetarjeta: { type: String, 
    required: true 
  },
  fechadeexpiracion: { type: Date, 
    required: true 
  },
  cvv: { type: String, 
    required: true 
  },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Asegúrate de que este campo es obligatorio
});

export default mongoose.model('Payment', paymentSchema);
