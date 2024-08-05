import { z } from 'zod';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'; // Ajusta la ruta si es necesario

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.error(error);
        const errorMessages = error.errors ? error.errors.map((err) => err.message) : ['Invalid request body'];
        return res.status(400).json({ message: errorMessages });
    }
};

export const validateRegister = validateSchema(registerSchema);
export const validateLogin = validateSchema(loginSchema);