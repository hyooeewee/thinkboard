/** @format */

import mongoose from 'mongoose';

// 1 - Create a schema
// 2 - model based off of that schema
const note = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }, // add createdAt and updatedAt
);
const Note = mongoose.model('Note', note);
export default Note;
