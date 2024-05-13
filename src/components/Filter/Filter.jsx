import Button from './../Button/Button';
import styles from './Filter.module.css';
import { useNotes } from '../../context/NotesContext';

function Filter() {
	const { filters, setFilterCategory } = useNotes();

	return (
		<div className={styles.filterContainer}>
			{filters.map((filterEl, index) => (
				<Button
					key={index}
					textColor={filterEl.textColor}
					bgColor={filterEl.bgColor}
					isActive={filterEl.active}
					id={filterEl.id}
					onClick={() => setFilterCategory(filterEl.filter)}>
					{filterEl.filter}
				</Button>
			))}
		</div>
	);
}

export default Filter;
