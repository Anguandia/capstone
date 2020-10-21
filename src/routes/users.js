import express from 'express';
const router = express.Router();

import { home, signup, allUsers, getUser, login } from '../controllers/users.js';
import { validName } from '../middlewares/validation.js';

router.get('/', home);
router.post('/signup', validName, signup);
router.get('/users', allUsers);
router.get('/users/:id', getUser);
router.post('/login', login);

export default router;