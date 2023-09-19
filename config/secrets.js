import crypto from 'crypto';
const generateRandomSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
};

export const secrets = {
    jwtSecret: generateRandomSecret(),
};

export const PORT = 5555
export const mongoDBURL = `mongodb://localhost:27017`