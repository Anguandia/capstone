import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secrete = process.env.SECRET_KEY;

export const generateToken = function (userDetails) {
  return jwt.sign(userDetails, secrete, { expiresIn: '1800s' });
}

