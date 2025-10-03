/** @format */

import express from 'express';
import notesRouter from './routers/notesRouter.js';

const app = express();

app.use('/api/notes', notesRouter);

app.listen(5001, () => console.log('Server started on PORT: 5001!'));
