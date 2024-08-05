import { TOKEN_SECRET } from "../config.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from '../libs/mailer.js';
import UserAccountVerificationLog from '../models/userAccountVerificationLog.js';

export const register = async (req, res) => {
    const { email, password, username, nombre, apellidos, telefono, direccion } = req.body;
    try {
        // Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con los nuevos campos
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            nombre,
            apellidos,
            telefono,
            direccion
        });

        // Guardar el usuario en la base de datos
        const userSaved = await newUser.save();

        // Crear un token de acceso
        const token = await createAccessToken({ id: userSaved._id });

        // Crear un registro de verificación de cuenta
        const logEntry = new UserAccountVerificationLog({
            user: userSaved._id,
            emailSentDate: new Date(),
        });
        await logEntry.save();

        // Configurar la cookie con el token
        res.cookie('token', token);
        

        // Enviar la respuesta con los detalles del usuario
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            nombre: userSaved.nombre,
            apellidos: userSaved.apellidos,
            telefono: userSaved.telefono,
            direccion: userSaved.direccion,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

        // Enviar el correo de verificación
        await sendVerificationEmail(email, token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: ["The email doesn't exists"] });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: ["The password is incorrect"] });
        }

        const token = await createAccessToken({ id: userFound._id, username: userFound.username, rol: userFound.rol });

        res.cookie("token", token, { httpOnly: process.env.NODE_ENV !== "development", secure: true, sameSite: "none" });
        console.log(token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            rol: userFound.rol
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(404).json({ message: `User ${req.user.id} not found` });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        nombre: userFound.nombre,
        apellidos: userFound.apellidos,
        telefono: userFound.telefono,
        direccion: userFound.direccion,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const verifyAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).send({ message: 'Invalid token' });

        user.isVerified = true;
        await user.save();

        await UserAccountVerificationLog.findOneAndUpdate(
            { user: user._id },
            { verificationDate: new Date() }
        );

        res.status(200).send({ message: 'Account verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
