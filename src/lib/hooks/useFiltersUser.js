import { useState } from 'react';
import { PAGINATION } from '../../constants/pagination';
import SORT_OPTIONS from '../../constants/sortOptions';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	userPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};
export const useFiltersUsers = () => {
	const [filters, setFilters] = useState(INITIAL_STATE);

	const setSearch = search => {
		setFilters({
			...filters,
			search,
			page: PAGINATION.DEFAULT_PAGE
		});
	};

	const setOnlyActive = onlyActive => {
		const newSortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;

		setFilters({
			...filters,
			onlyActive,
			sortBy: newSortBy,
			page: PAGINATION.DEFAULT_PAGE
		});
	};

	const setSortBy = sortBy => {
		setFilters({
			...filters,
			sortBy,
			page: PAGINATION.DEFAULT_PAGE
		});
	};

	const setPage = newPage =>
		setFilters({
			...filters,
			page: newPage
		});

	const setUserPerPage = newUserPerPage =>
		setFilters({
			...filters,
			userPerPage: newUserPerPage,
			page: PAGINATION.DEFAULT_PAGE
		});

	const resetFilters = () => {
		setFilters({ ...INITIAL_STATE });
	};

	return {
		filters,
		filterSetters: {
			setSearch,
			setOnlyActive,
			setSortBy
		},
		paginationSetters: {
			setPage,
			setUserPerPage
		},
		resetFilters
	};
};
