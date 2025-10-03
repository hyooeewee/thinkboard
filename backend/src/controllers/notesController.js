/** @format */
import Note from '../models/note.js';
export const getAllNotes = async (_, res) => {
	// fetch all notes
	try {
		const notes = await Note.find().sort({ createdAt: -1 }); // sort by createdAt, descending
		res.status(200).json({
			msg: 'Notes fetched successfully!',
			data: notes,
		});
	} catch (error) {
		console.error('Error in getAllNotes controller', error);
		res.status(500).json({
			msg: 'Internal server error',
		});
	}
};

export const getNoteById = async (req, res) => {
	// get a note
	try {
		const { id } = req.params;
		const note = await Note.findById(id);
		if (!note)
			return res.status(404).json({
				msg: 'Note not found!',
			});
		res.status(200).json({
			msg: 'Note fetched successfully!',
			data: note,
		});
	} catch (error) {
		console.error('Error in getNoteById controller', error);
		res.status(500).json({
			msg: 'Internal server error',
		});
	}
};

export const createNote = async (req, res) => {
	// create a note
	try {
		const { title, content } = req.body;
		const note = await Note.create({
			title,
			content,
		});
		const savedNote = await note.save();
		res.status(201).json({
			msg: 'Note created successfully!',
			data: savedNote,
		});
	} catch (error) {
		console.error('Error in createNote controller', error);
		res.status(500).json({
			msg: 'Internal server error',
		});
	}
};
export const updateNote = async (req, res) => {
	// update a note
	try {
		const { id } = req.params;
		const { title, content } = req.body;
		const updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				title,
				content,
			},
			{
				new: true,
			},
		);
		if (!updatedNote)
			return res.status(404).json({
				msg: 'Note not found!',
			});
		res.status(200).json({
			msg: 'Note updated successfully!',
			data: updatedNote,
		});
	} catch (error) {
		console.error('Error in updateNote controller', error);
		res.status(500).json({
			msg: 'Internal server error',
		});
	}
};
export const deleteNote = async (req, res) => {
	// delete a note
	try {
		const { id } = req.params;
		const deletedNote = await Note.findByIdAndDelete(id);
		if (!deletedNote)
			return res.status(404).json({
				msg: 'Note not found!',
			});
		res.status(200).json({
			msg: 'Note deleted successfully!',
			data: deletedNote,
		});
	} catch (error) {
		console.error('Error in deleteNote controller', error);
		res.status(500).json({
			msg: 'Internal server error',
		});
	}
};
