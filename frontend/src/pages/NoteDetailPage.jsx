/** @format */
import NoteForm from '@/components/NoteForm';
import api from '@/lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';

const NoteDetailPage = () => {
	const [note, setNote] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const fetchNote = async () => {
			setIsLoading(true);
			try {
				const res = await api.get(`/notes/${id}`);
				if (res.status === 200) {
					setNote(res.data.data);
				}
			} catch (error) {
				console.error('Error in fetchNote: ', error);
				if (error.response?.status === 429) {
					toast.error('Too many requests.');
				}
				if (error.response?.status === 404) {
					toast.error('Note not found.');
				} else {
					toast.error('Failed to fetch the note.');
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchNote();
	}, [id]);

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete this note?')) return;
		try {
			const res = await api.delete(`/notes/${id}`);
			if (res.status === 200) {
				toast.success(res.data.msg);
				navigate('/');
			}
		} catch (error) {
			console.error('Error in handleDelete: ', error);
			if (error.response?.status === 404) {
				toast.error('Note not found.');
			} else if (error.response?.status === 429) {
				toast.error('Too many requests.');
			} else {
				toast.error('Failed to delete the note.');
			}
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!note.title.trim() || !note.content.trim()) {
			toast.error('All fields are required.');
			return;
		}
		setIsSaving(true);
		try {
			const res = await api.put(`/notes/${id}`, note);
			if (res.status === 200) {
				toast.success(res.data.msg);
				navigate('/');
			}
		} catch (error) {
			console.error('Error in handleSave: ', error);
			if (error.response?.status === 404) {
				toast.error('Note not found.');
			} else if (error.response?.status === 429) {
				toast.error('Too many requests.');
			} else {
				toast.error('Failed to update the note.');
			}
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-10"></LoaderIcon>
			</div>
		);
	}
	return (
		<div className="min-h-screen bg-base-200 ">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<Link to="/" className="btn btn-ghost">
							<ArrowLeftIcon className="size-5" />
							Back to Notes
						</Link>
						<button onClick={handleDelete} className="btn btn-error btn-outline">
							<Trash2Icon className="size-5" />
							Delete Note
						</button>
					</div>
					<div className="card bg-base-100 rounded-lg">
						<div className="card-body">
							<NoteForm data={{ note, setNote, isProcessing: isSaving, btnText: isSaving ? 'Saving' : 'Save Note', handleSubmit }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;
