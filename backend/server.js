/** @format */

import express from 'express';
const app = express();

app.get('/api/notes', (req, res) => {
	// delete a note
	res.status(200).send('You got 50 notes!');
});

app.post('/api/notes', (req, res) => {
	// create a note
	res.status(201).json({
		msg: 'Note created successfully!',
	});
});

app.put('/api/notes/:id', (req, res) => {
	// update a note
	res.status(200).json({
		msg: 'Note updated successfully!',
	});
});

app.delete('/api/notes/:id', (req, res) => {
	// delete a note
	res.status(200).json({
		msg: 'Note deleted successfully!',
	});
});

app.listen(5001, () => console.log('Server started on PORT: 5001!'));
