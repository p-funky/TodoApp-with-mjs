import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET_TOKEN || 'secret';

const generateToken = async (user) => 
    jwt.sign({
        userId: user.id,
        name: user.name,
        email: user.email,
    }, secret, { expiresIn: '24h' });

export default generateToken;