import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secrete = process.env.SECRET_KEY;

export const verify = function (req, res, next) {
  const authorization = req.headers['authorization'];
  const token = authorization && authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'please login' });
  jwt.verify(token, secrete, (err, user) => {
    if (err) return res.status(403).json({ error: 'invalid token' });
    console.log(user, '>>>>>>');
    req.user = user;
    next();
  })
}