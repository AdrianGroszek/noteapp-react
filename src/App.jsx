import { useEffect } from 'react';
import CreateNoteForm from './components/CreateNoteForm/CreateNoteForm';
import Filter from './components/Filter/Filter';
import Navbar from './components/Navbar/Navbar';
import NoteCard from './components/NoteCard/NoteCard';
import SpecialButton from './components/SpecialButton/SpecialButton';
import { useNotes } from './context/NotesContext';

function App() {
	const { isAddFormOpen, filteredItems, dispatch } = useNotes();

	useEffect(() => {
		dispatch({ type: 'note/filterCategory', payload: 'All' });
	}, [dispatch]);
	return (
		<>
			{isAddFormOpen && <CreateNoteForm />}
			<Navbar />
			<Filter />
			<div className='note-container'>
				<ul
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '20px',
						listStyle: 'none',
					}}>
					{filteredItems.map((note) => (
						<NoteCard key={note.id} note={note} />
					))}
					<SpecialButton />
				</ul>
			</div>
		</>
	);
}

export default App;
