/** @format */

import api from '@/lib/axios';
import { formatDate } from '@/lib/utils';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router';

const NoteCard = ({ note, setNotes }) => {
	const handleDelete = async (e, id) => {
		e.preventDefault(); // get rid of the navigation behavior
		if (!window.confirm('Are you sure to delete this note?')) return;
		try {
			const res = await api.delete(`/notes/${id}`);
			if (res.status === 200) {
				setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted note
				toast.success(res.data.msg);
			}
		} catch (error) {
			console.error('Error in handleDelete: ', error);
			if (error.response?.status === 429) {
				toast.error('Too many requests.');
			} else if (error.response?.status === 404) {
				toast.error('Note not found.');
			} else {
				toast.error('Failed to delete note.');
			}
		}
	};
	return (
		<Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]">
			<div className="card-body">
				<h3 className="card-title text-base-content">{note.title}</h3>
				<p className="text-base-content/70 line-clamp-3"></p>
				<div className="card-actions justify-between items-center mt-4">
					<span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
					<div className="flex items-center gap-1">
						<PenSquareIcon className="size-4" />
						<button className="btn  btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
							<Trash2Icon className="size-4" />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default NoteCard;
