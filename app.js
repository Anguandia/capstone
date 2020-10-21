import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import userRouter from './src/routes/users.js';
import blogRouter from './src/routes/blogs.js';

const port = process.env.PORT;
const app = express();

const mongoDb = process.env.NODE_ENV == 'test'
  ? process.env.TESTDB
  : process.env.DB;
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDb connection err0r'));
db.on('connection', console.error.bind(console, 'mongoDb connected'));

app.use(bodyParser());
app.use(userRouter);
app.use('/blogs', blogRouter);

export default app;