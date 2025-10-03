/** @format */

import toast from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';

const App = () => {
	return (
		<div>
			<button onClick={() => toast.success('Hello World')} className="btn btn-outline">
				Click me!
			</button>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
				<Route path="/note/:id" element={<NoteDetailPage />} />
			</Routes>
		</div>
	);
};

export default App;
