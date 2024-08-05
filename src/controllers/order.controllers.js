import Order from '../models/order.model.js';
import Product from '../models/products.model.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId');
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createOrder = async (req, res) => {
    const { userId, username, products } = req.body;
    try {
        // Calcula el precio total
        const productDetails = await Promise.all(products.map(async (prod) => {
            const product = await Product.findById(prod.productId);
            return {
                productId: prod.productId,
                name: product.nombreDelJuego,
                quantity: prod.quantity,
                price: product.precio
            };
        }));
        
        const totalPrice = productDetails.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);

        const newOrder = new Order({
            userId,
            username,
            products: productDetails,
            totalPrice
        });

        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { userId, username, products } = req.body;
        const updatedProducts = await Promise.all(products.map(async (prod) => {
            const product = await Product.findById(prod.productId);
            return {
                productId: prod.productId,
                name: product.nombreDelJuego,
                quantity: prod.quantity,
                price: product.precio
            };
        }));

        const totalPrice = updatedProducts.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            userId,
            username,
            products: updatedProducts,
            totalPrice
        }, { new: true }).populate('userId').populate('products.productId');

        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
