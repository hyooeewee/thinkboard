/** @format */

import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import notesRouter from './routers/notesRouter.js';

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use('/api/notes', notesRouter);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}!`));
