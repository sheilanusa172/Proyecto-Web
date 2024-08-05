import Producto from '../models/products.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Producto.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createProduct = async (req, res) => {
    const { nombreDelJuego, descripcion, precio, puntuacion } = req.body;
    try {
        const newProduct = new Producto({
            nombreDelJuego,
            descripcion,
            precio,
            puntuacion
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            id: savedProduct._id,
            nombreDelJuego: savedProduct.nombreDelJuego,
            descripcion: savedProduct.descripcion,
            precio: savedProduct.precio,
            puntuacion: savedProduct.puntuacion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Producto.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Producto.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
