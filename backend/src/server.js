/** @format */

import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import notesRouter from './routers/notesRouter.js';

dotenv.config();
// console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;

const app = express();

// middlewares
app.use(express.json()); // for parsing application/json: req.body
app.use(rateLimiter);

// routers
app.use('/api/notes', notesRouter);

connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}!`));
});
