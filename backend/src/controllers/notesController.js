/** @format */

export const getAllNotes = async (req, res) => {
	// delete a note
	res.status(200).send('Notes fetched successfully!');
};
export const createNote = async (req, res) => {
	// create a note
	res.status(201).json({
		msg: 'Note created successfully!',
	});
};
export const updateNote = async (req, res) => {
	// update a note
	res.status(200).json({
		msg: 'Note updated successfully!',
	});
};
export const deleteNote = async (req, res) => {
	// delete a note
	res.status(200).json({
		msg: 'Note deleted successfully!',
	});
};
