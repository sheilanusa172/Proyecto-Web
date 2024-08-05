import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},

  email: { 
    type: String, 
    required: true, 
    unique: true 
},

  password: { 
    type: String, 
    required: true 
},

  nombre: { 
    type: String, 
    required: true 
},


  apellidos: { 
    type: String, 
    required: true 
},

  telefono: { 
    type: String, 
    required: true 
},

  direccion: { 
    type: String, 
    required: true
},

  isVerified: { 
    type: Boolean, 
    default: false 
},
  rol: { 
    type: String,   
    default: 'user' 
}
});

export default mongoose.model('User', userSchema);