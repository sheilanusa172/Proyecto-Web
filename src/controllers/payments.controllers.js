import Payment from '../models/payments.model.js';
import crypto from 'crypto';

// Tamaño del IV y el tamaño del key de AES-256
const IV_LENGTH = 16;
const KEY_LENGTH = 32; // Debe ser de 32 bytes para AES-256

const encryptCVV = (cvv) => {
  if (!cvv) {
    throw new Error('CVV is required');
  }

  const key = process.env.CVV_SECRET;

  if (!key) {
    throw new Error('Encryption key is not set');
  }

  // Decodifica la clave de base64 a un buffer
  const keyBuffer = Buffer.from(key, 'base64');

  if (keyBuffer.length !== KEY_LENGTH) {
    throw new Error(`Encryption key must be ${KEY_LENGTH} bytes long`);
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);

  let encrypted = cipher.update(cvv, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
};

export const addPayment = async (req, res) => {
  try {
    console.log("User from request:", req.user); // Depura aquí

    const { nombre, numerodetarjeta, fechadeexpiracion, cvv } = req.body;
    if (!cvv) {
      return res.status(400).json({ message: 'CVV is required' });
    }
    const encryptedCVV = encryptCVV(cvv);
    const newPayment = new Payment({
      nombre,
      numerodetarjeta,
      fechadeexpiracion,
      cvv: encryptedCVV,
      usuario: req.user.id // Verifica que req.user.id esté presente
    });
    await newPayment.save();
    res.status(201).json({ message: 'Payment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find(); // Ajusta esta línea según tu lógica
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ usuario: userId });
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for this user' });
    }
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
