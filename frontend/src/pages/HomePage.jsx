/** @format */
import api from '@/lib/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import RateLimitedUI from '@/components/RateLimitedUI';

const HomePage = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [notes, setNotes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const res = await api.get('/notes');
				setNotes(res.data.data);
				setIsRateLimited(false);
			} catch (error) {
				console.error('Error fetching notes: ', error);
				if (error.response?.status === 429) {
					setIsRateLimited(true);
				} else {
					toast.error('Error fetching notes');
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchNotes();
	}, []);
	return (
		<div className="min-h-screen">
			<Navbar />
			{isRateLimited && <RateLimitedUI />}
			<div className="max-w-7xl mx-auto p-4 mt-6">{isLoading && <div className="text-center text-primary py-10">Loading notes ...</div>}</div>
			{notes.length > 0 && !isRateLimited && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{notes.map((note) => (
						<NoteCard key={note._id} note={note} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
