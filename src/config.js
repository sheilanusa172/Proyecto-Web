import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sheilanusa172:Fwxk4590@e-commerce.5g1yw4h.mongodb.net/?retryWrites=true&w=majority&appName=E-commerce";
export const TOKEN_SECRET = "some secret key";

export const ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef';
export const IV_LENGTH = 16;
export const CVV_SECRET = process.env.CVV_SECRET || "a_very_long_32_byte_key_for_aes_256";