import { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import styles from './CreateNoteForm.module.css';
import { v4 } from 'uuid';

function CreateNoteForm() {
	const { toggleAddNoteForm, addNote, filterCategory } = useNotes();
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');
	const [noteCategory, setNoteCategory] = useState('Work');

	const noteDate = new Date().toLocaleDateString();

	function createNote() {
		if (!noteTitle || !noteContent || !noteCategory) return;

		const newNote = {
			id: v4(),
			noteTitle,
			noteContent,
			noteDate,
			noteCategory,
		};

		filterCategory === 'All'
			? addNote(newNote, 'All')
			: addNote(newNote, newNote.noteCategory);
		toggleAddNoteForm();
	}

	return (
		<>
			<div onClick={toggleAddNoteForm} className={styles.bgOpacity}></div>
			<form className={styles.formWindow}>
				<div className={styles.inputsContainer}>
					<h3 className={styles.formHeader}>Create Note</h3>
					<div className={styles.inputBox}>
						<label>Title</label>
						<input
							type='text'
							placeholder='Example title'
							onChange={(e) => setNoteTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputBox}>
						<label>Description</label>
						<textarea
							maxLength='200'
							name=''
							id=''
							cols='30'
							rows='7'
							placeholder='Example description...'
							onChange={(e) => setNoteContent(e.target.value)}></textarea>
					</div>
					<div className={styles.inputBox}>
						<label>Note Category</label>
						<select
							name=''
							id=''
							onChange={(e) => setNoteCategory(e.target.value)}>
							<option value='Work'>Work</option>
							<option value='Learning'>Learning</option>
							<option value='Shopping'>Shopping</option>
							<option value='Personal'>Personal</option>
							<option value='Health and fitness'>Health and fitness</option>
							<option value='Creativity'>Creativity</option>
							<option value='Finances'>Finances</option>
							<option value='Travels'>Travels</option>
							<option value='Others'>Others</option>
						</select>
					</div>
				</div>
				<div className={styles.btnBox}>
					<button
						className={`${styles.btn} ${styles.btnRed}`}
						onClick={toggleAddNoteForm}>
						Cancel
					</button>
					<button
						className={`${styles.btn} ${styles.btnGreen}`}
						onClick={(e) => {
							e.preventDefault();
							createNote();
						}}>
						+ Create Note
					</button>
				</div>
			</form>
		</>
	);
}

export default CreateNoteForm;
