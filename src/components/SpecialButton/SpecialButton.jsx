import { useNotes } from '../../context/NotesContext';
import styles from './SpecialButton.module.css';

function SpecialButton() {
	const { toggleAddNoteForm } = useNotes();
	return (
		<button onClick={toggleAddNoteForm} className={styles.specialBtn}>
			+ ADD NEW NOTE
		</button>
	);
}

export default SpecialButton;
