import { FILTER_ACTIONS } from '../../constants/filterActions';
import { PAGINATION } from '../../constants/pagination';
import SORT_OPTIONS from '../../constants/sortOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	userPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const filtersReducer = (state, action) => {
	switch (action.type) {
		case FILTER_ACTIONS.SEARCH:
			return {
				...state,
				search: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTER_ACTIONS.ONLY_ACTIVE: {
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
		case FILTER_ACTIONS.SORT_BY: {
			return {
				...state,
				sortBy: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		}
		case FILTER_ACTIONS.PAGE: {
			return {
				...state,
				page: action.value
			};
		}
		case FILTER_ACTIONS.ITEMS_PER_PAGE: {
			return {
				...state,
				userPerPage: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		}
		case FILTER_ACTIONS.RESET: {
			return { ...FILTERS_INITIAL_STATE }; // Esto ha de ser una copia de INITIAL_STATE sino no se actualizarán los usuarios cuando se editen
		}
		default:
			throw new Error('Invalid action type');
	}
};
