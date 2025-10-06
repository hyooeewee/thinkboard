/** @format */
import NoteForm from '@/components/NoteForm';
import api from '@/lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
const CreatePage = () => {
	const [note, setNote] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!note.title.trim() || !note.content.trim()) {
			toast.error('All fields are required');
			return;
		}
		setIsLoading(true);
		try {
			const res = await api.post('/notes', note);
			if (res.status === 201) {
				toast.success(res.data.msg);
				navigate('/');
			}
		} catch (error) {
			console.error('Error creating note: ', error);
			if (error.response?.status === 429) {
				toast.error("Slow down! You're creating notes too fast.", {
					duration: 4000,
					icon: '⚠️',
				});
			} else {
				toast.error('Error creating note');
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<Link to={'/'} className="btn btn-ghost mb-6">
						<ArrowLeftIcon className="size-5" />
						Back to Notes
					</Link>

					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-2xl mb-4">Create New Note</h2>
							<NoteForm
								data={{
									note,
									setNote,
									isProcessing: isLoading,
									btnText: isLoading ? 'Creating ...' : 'Create Note',
									handleSubmit,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;
