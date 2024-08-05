import crypto from 'crypto';

const base64Key = 'xh3qpcY0DCJtQxPixjcLOBBpZGJQccrlg4L7Tneynpo=';

try {
  const keyBuffer = Buffer.from(base64Key, 'base64');

  console.log(`La longitud de la clave en bytes es: ${keyBuffer.length}`);
  
  if (keyBuffer.length === 32) {
    console.log('La longitud de la clave es correcta.');
  } else {
    console.log('La longitud de la clave no es correcta.');
  }
} catch (error) {
  console.error('Error al procesar la clave:', error.message);
}