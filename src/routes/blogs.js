import express from 'express';
const router = express.Router();
import {verify} from '../middlewares/auth.js';

import { blogs, allBlogs, getBlog } from '../controllers/users.js';

router.get('/', allBlogs);
router.get('/:id', getBlog);
router.post('/', verify, blogs);

export default router;