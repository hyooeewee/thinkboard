/** @format */

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import path from 'path';
import { connectDB } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import notesRouter from './routers/notesRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5001;
console.log(`${process.env.NODE_ENV} Mode`);

const app = express();

// development
if (process.env.NODE_ENV !== 'production') {
	app.use(cors({ origin: 'http://localhost:5173' })); // for CORS, must be top
}

// middlewares
app.use(express.json()); // for parsing application/json: req.body
app.use(rateLimiter); // for rate limiting

// routers
app.use('/api/notes', notesRouter);

// deployment
if (process.env.NODE_ENV === 'production') {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
	});
}

connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}!`));
}); // Add listener after DB connection successfully
