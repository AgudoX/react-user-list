import { useState } from 'react';
import SORT_OPTIONS from '../../constants/sortOptions';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: 1,
	userPerPage: 6
};
export const useFiltersUsers = () => {
	const [filters, setFilters] = useState(INITIAL_STATE);

	const setSearch = search => {
		setFilters({
			...filters,
			search,
			page: 1
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
			page: 1
		});
	};

	const setSortBy = sortBy => {
		setFilters({
			...filters,
			sortBy,
			page: 1
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
			page: 1
		});

	const resetFilters = () => {
		setFilters(INITIAL_STATE);
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
