import crypto from 'crypto';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const IV_LENGTH = 16;
const KEY_LENGTH = 32;

const key = process.env.CVV_SECRET;
if (!key) {
  throw new Error('Encryption key is not set');
}

const keyBuffer = Buffer.from(key, 'base64');

if (keyBuffer.length !== KEY_LENGTH) {
  throw new Error(`Encryption key must be ${KEY_LENGTH} bytes long`);
}

const encryptCVV = (cvv) => {
  if (!cvv) {
    throw new Error('CVV is required');
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);

  let encrypted = cipher.update(cvv, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
};

const decryptCVV = (encryptedCVV) => {
  const parts = encryptedCVV.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = parts.join(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const testCVV = '123';
const encrypted = encryptCVV(testCVV);
console.log('Encrypted CVV:', encrypted);

const decrypted = decryptCVV(encrypted);
console.log('Decrypted CVV:', decrypted);

