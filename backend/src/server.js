/** @format */

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import notesRouter from './routers/notesRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // for CORS, must be top
app.use(express.json()); // for parsing application/json: req.body
app.use(rateLimiter); // for rate limiting

// routers
app.use('/api/notes', notesRouter);

connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}!`));
}); // Add listener after DB connection successfully
