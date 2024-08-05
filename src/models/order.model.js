import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
         required: true 
        },
    username: { 
        type: String, 
        required: true 
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],

    totalPrice: { 
        type: Number, 
        required: true 
    },
    
    createdAt: { 
        type: Date,
         default: Date.now 
        }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
