import { useEffect, useState } from 'react';
import { findAllUsers } from '../api/usersApi';

const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		count: 0,
		loading: true,
		error: false
	});

	const setData = (newData, newCount) =>
		setUsers({ data: newData, error: false, loading: false, count: newCount });

	const setError = () =>
		setUsers({ data: [], error: true, loading: false, count: 0 });

	useEffect(() => {
		const controller = new AbortController();

		fetchUsers(controller.signal, setData, setError, filters);

		return () => controller.abort();
	}, [filters]);

	return {
		users: users.data,
		totalUsers: users.count,
		usersError: users.error,
		usersLoading: users.loading
	};
};

const fetchUsers = async (signal, setData, setError, filters) => {
	const { users, count, aborted } = await findAllUsers(signal, filters);
	if (aborted) return;
	if (users) setData(users, count);
	else setError();
};

export default useUsers;
