import { createContext, useContext, useReducer } from 'react';

const NotesContext = createContext();

const initialState = {
	isAddFormOpen: false,
	notes: [
		{
			id: 1,
			noteTitle: 'Test learning note',
			noteContent:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ea consectetur quidem inventore fuga facilis dolores similique numquam non temporibus labore, odio commodi, voluptatem.',
			noteDate: 'dd/mm/yyyy',
			noteCategory: 'Learning',
		},
		{
			id: 21,
			noteTitle: 'Test work note',
			noteContent:
				'Work Work, work, work, work, work, work He said me work, work, work, work, work, work',
			noteDate: 'dd/mm/yyyy',
			noteCategory: 'Work',
		},
		{
			id: 13,
			noteTitle: 'Creativity note',
			noteContent: 'hello',
			noteDate: 'dd/mm/yyyy',
			noteCategory: 'Creativity',
		},
	],
	filterCategory: 'All',
	filteredItems: [],
	filters: [
		{
			id: '0',
			filter: 'All',
			textColor: '#78716C',
			bgColor: '#F5F5F4',
			active: true,
		},
		{
			id: '1',
			filter: 'Work',
			textColor: '#CA8A04',
			bgColor: '#FEF9C3',
			active: false,
		},
		{
			id: '2',
			filter: 'Learning',
			textColor: '#F97316',
			bgColor: '#FFEDD5',
			active: false,
		},
		{
			id: '3',
			filter: 'Shopping',
			textColor: '#ef4444',
			bgColor: '#FEE2E2',
			active: false,
		},
		{
			id: '4',
			filter: 'Personal',
			textColor: '#65A30D',
			bgColor: '#ECFCCB',
			active: false,
		},
		{
			id: '5',
			filter: 'Health and fitness',
			textColor: '#22C55E',
			bgColor: '#DCFCE7',
			active: false,
		},
		{
			id: '6',
			filter: 'Creativity',
			textColor: '#14B8A6',
			bgColor: '#CCFBF1',
			active: false,
		},
		{
			id: '7',
			filter: 'Finances',
			textColor: '#06B6D4',
			bgColor: '#CFFAFE',
			active: false,
		},
		{
			id: '8',
			filter: 'Travels',
			textColor: '#3B82F6',
			bgColor: '#DBEAFE',
			active: false,
		},
		{
			id: '9',
			filter: 'Others',
			textColor: '#8B5CF6',
			bgColor: '#EDE9FE',
			active: false,
		},
	],
	inputValue: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'note/toggleNoteAddForm':
			return {
				...state,
				isAddFormOpen: !state.isAddFormOpen,
			};
		case 'note/created':
			return {
				...state,
				notes: [...state.notes, action.payload],
				filteredItems: [...state.notes, action.payload],
			};
		case 'note/deleted':
			return {
				...state,
				notes: state.notes.filter((note) => note.id !== action.payload),
				filteredItems: state.filteredItems.filter(
					(note) => note.id !== action.payload
				),
			};
		case 'note/filter': {
			const searchTerm = action.payload.toLowerCase().trim();
			let filteredNotesTemp = [];
			if (state.filterCategory === 'All') {
				filteredNotesTemp = state.notes.filter(
					(note) =>
						note.noteTitle.toLowerCase().includes(searchTerm) ||
						note.noteContent.toLowerCase().includes(searchTerm)
				);
			}
			if (state.filterCategory !== 'All') {
				filteredNotesTemp = state.notes.filter(
					(note) =>
						note.noteCategory === state.filterCategory &&
						(note.noteTitle.toLowerCase().includes(searchTerm) ||
							note.noteContent.toLowerCase().includes(searchTerm))
				);
			}
			return {
				...state,
				filteredItems: filteredNotesTemp,
			};
		}
		case 'note/filterCategory': {
			//ustawianie active w filters na true lub false
			state.filters.map((filterItem) =>
				filterItem.filter === action.payload
					? (filterItem.active = true)
					: (filterItem.active = false)
			);
			//tworzenie zmiennej, która przechowuje przefiltrowane elementy na podstawie kategorii

			const filteredNotes =
				action.payload === 'All'
					? state.notes
					: state.notes.filter(
							(noteItem) => noteItem.noteCategory === action.payload
					  );

			return {
				...state,
				filterCategory: action.payload,
				filteredItems: filteredNotes,
				inputValue: '',
			};
		}

		case 'input/updateValue':
			return {
				...state,
				inputValue: action.payload,
			};
		default:
			throw new Error('Unknown action type');
	}
}

function NotesProvider({ children }) {
	const [
		{
			notes,
			isAddFormOpen,
			filters,
			filterCategory,
			filteredItems,
			inputValue,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	function toggleAddNoteForm() {
		dispatch({ type: 'note/toggleNoteAddForm' });
	}

	function addNote(noteContent, category) {
		dispatch({ type: 'note/created', payload: noteContent });
		dispatch({ type: 'note/filterCategory', payload: category });
	}

	function deleteNote(id) {
		dispatch({ type: 'note/deleted', payload: id });
	}

	function filterNotes(searchTerm) {
		dispatch({ type: 'note/filter', payload: searchTerm });
	}

	function setFilterCategory(category) {
		dispatch({ type: 'note/filterCategory', payload: category });
	}

	function updateInputValue(value) {
		dispatch({ type: 'input/updateValue', payload: value });
	}

	return (
		<NotesContext.Provider
			value={{
				notes,
				isAddFormOpen,
				filters,
				filterCategory,
				filteredItems,
				inputValue,
				updateInputValue,
				dispatch,
				toggleAddNoteForm,
				addNote,
				deleteNote,
				filterNotes,
				setFilterCategory,
			}}>
			{children}
		</NotesContext.Provider>
	);
}

function useNotes() {
	const context = useContext(NotesContext);
	if (context === undefined)
		throw new Error('Error, NotesContext was used outside the NotesProvider');
	return context;
}

export { NotesProvider, useNotes };
