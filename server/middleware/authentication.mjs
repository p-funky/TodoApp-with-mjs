import jwt from 'jsonwebtoken';
import model from '../models';

const secret = process.env.JWT_SECRET_TOKEN || 'secret';

const Authorization = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      req.decoded = decoded;
      return next();
    });
  },
  verifyOwnProfile(req, res, next) {
    const id = req.params.id;
    const userId = req.decoded.userId;
    if (Number(id) === userId) {
      return next();
    }
    return res.status(403).send({ message: 'User not authorised' });
  }
};

export default Authorization;
