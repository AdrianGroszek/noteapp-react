import { useEffect } from 'react';
import { useNotes } from '../../context/NotesContext';
import styles from './Navbar.module.css';

function Navbar() {
	const {
		toggleAddNoteForm,
		filterNotes,
		filterCategory,
		inputValue,
		updateInputValue,
	} = useNotes();

	function handleInputChange(e) {
		updateInputValue(e.target.value);
	}

	useEffect(() => {
		filterNotes(inputValue);
	}, [inputValue]);

	return (
		<div className={styles.navbarContainer}>
			<h3 className={styles.logo}>{filterCategory}</h3>
			<input
				type='text'
				placeholder='Search your notes...'
				className={styles.searchInput}
				onChange={(e) => handleInputChange(e)}
				value={inputValue}
			/>
			<button onClick={toggleAddNoteForm} className={styles.btnAddNote}>
				+ ADD NEW NOTE
			</button>
		</div>
	);
}

export default Navbar;
