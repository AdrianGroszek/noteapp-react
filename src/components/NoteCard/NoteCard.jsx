import { useNotes } from '../../context/NotesContext';
import styles from './NoteCard.module.css';

function NoteCard({ note }) {
	const { id, noteTitle, noteContent, noteDate, noteCategory } = note;

	const { deleteNote, filters } = useNotes();

	const targetObject = filters.find((filter) => filter.filter === noteCategory);

	return (
		<li className={styles.cardItem}>
			<div className={styles.noteTextBox}>
				<div className={styles.noteHeader}>
					<h3>{noteTitle}</h3>
					<span>{noteDate}</span>
				</div>
				<p>{noteContent}</p>
			</div>
			<div className={styles.noteBtnsBox}>
				<div
					className={styles.categoryInfo}
					style={{
						backgroundColor: `${targetObject.bgColor}`,
						color: `${targetObject.textColor}`,
					}}>
					{noteCategory.toUpperCase()}
				</div>
				<div className={styles.btns}>
					<button className={styles.editBtn}>Edit</button>
					<button className={styles.deleteBtn} onClick={() => deleteNote(id)}>
						X
					</button>
				</div>
			</div>
		</li>
	);
}

export default NoteCard;
