import jwt from 'jsonwebtoken';
import model from '../models';

const secret = process.env.JWT_SECRET_TOKEN || 'secret';

const Authorization = {
  verifyToken(req, res, next) {
    const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
      .send({ message: 'You are not authorized' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401)
            .send({ message: err.message });
      }
      req.decoded = decoded;
      return next();
    });
  }
};

export default Authorization;
