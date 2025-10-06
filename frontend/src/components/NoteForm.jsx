/** @format */

const NoteForm = ({ data }) => {
	const { note, setNote, isProcessing, btnText, handleSubmit } = data;
	return (
		<form onSubmit={handleSubmit} className="rounded-lg p-4">
			<div className="form-control mb-4 ">
				<label className="label">
					<span className="label-text">Title</span>
				</label>
				<input type="text" placeholder="Note Title" className="input input-bordered rounded-lg" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
			</div>
			<div className="form-control mb-4">
				<label className="label">
					<span className="label-text">Content</span>
				</label>
				<textarea placeholder="Write your note here..." className="textarea textarea-bordered h-32 rounded-lg" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
			</div>
			<div className="card-actions justify-end">
				<button type="submit" className="btn btn-primary" disabled={isProcessing}>
					{btnText}
				</button>
			</div>
		</form>
	);
};

export default NoteForm;
