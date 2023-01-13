import { useEffect, useState } from 'react';
import {
	filterByName,
	filterOnlyActive,
	paginateUsers,
	sortUsers
} from '../users/filterUsers';

const fetchUsers = async (signal, setData, setError) => {
	try {
		const response = await fetch(`http://localhost:4000/users`, { signal });
		if (response.ok) {
			const data = await response.json();
			setData(data);
		} else {
			setError();
		}
	} catch (error) {
		setError();
	}
};

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy, page, userPerPage }
) => {
	let userFiltered = filterOnlyActive(users, onlyActive);
	userFiltered = filterByName(userFiltered, search);
	userFiltered = sortUsers(userFiltered, sortBy);

	const { totalPages, paginatedUsers } = paginateUsers(
		userFiltered,
		page,
		userPerPage
	);

	return { totalPages, paginatedUsers };
};

const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		loading: true,
		error: false
	});

	const setData = newData =>
		setUsers({ data: newData, error: false, loading: false });

	const setError = () => setUsers({ data: [], error: true, loading: false });

	useEffect(() => {
		const controller = new AbortController();

		fetchUsers(controller.signal, setData, setError);

		return () => controller.abort();
	}, []);

	const { totalPages, paginatedUsers } = getUsersToDisplay(users.data, filters);

	return {
		users: paginatedUsers,
		totalPages,
		error: users.error,
		loading: users.loading
	};
};

export default useUsers;
