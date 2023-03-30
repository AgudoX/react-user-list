import { useReducer } from 'react';
import { PAGINATION } from '../../constants/pagination';
import SORT_OPTIONS from '../../constants/sortOptions';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	userPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

const filtersReducer = (state, action) => {
	switch (action.type) {
		case 'search_changed':
			return {
				...state,
				search: action.value,
				page: PAGINATION.DEFAULT_PAGE
			}
		case 'only_active_changed': {
			const newSortBy =
				action.value && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;

			return {
				...state,
				onlyActive: action.value,
				sortBy: newSortBy,
				page: PAGINATION.DEFAULT_PAGE
			};
		}
		case 'sort_by_changed': {
			return {
				...state,
				sortBy: action.value,
				page: PAGINATION.DEFAULT_PAGE
			}
		}
		case 'page_changed': {
			return {
				...state,
				page: action.value
			}
		}
		case 'items_per_page_changed': {
			return {
				...state,
				userPerPage: action.value,
				page: PAGINATION.DEFAULT_PAGE
			}
		}
		case 'reset': {
			return INITIAL_STATE
		}
		default:
			throw new Error('Invalid action type')
	}
}

export const useFiltersUsers = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducer, INITIAL_STATE);

	return {
		filters,
		dispatchFilters
	};
};
