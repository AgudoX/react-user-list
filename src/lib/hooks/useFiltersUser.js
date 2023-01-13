import { useState } from 'react';
import SORT_OPTIONS from '../../constants/sortOptions';

export const useFiltersUsers = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		userPerPage: 6
	});

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

	return {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setUserPerPage
	};
};
