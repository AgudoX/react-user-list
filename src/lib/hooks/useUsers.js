import { useEffect, useState } from 'react';
import { findAllUsers } from '../api/usersApi';

const useUsers = () => {
	const [users, setUsers] = useState({
		data: [],
		loading: true,
		error: false
	});

	const setData = newData =>
		setUsers({ data: newData, error: false, loading: false });

	const setError = () => setUsers({ data: [], error: true, loading: false });

	const reloadUsers = () => setUsers({ data: [], error: false, loading: true });

	useEffect(() => {
		if (!users.loading) return;

		const controller = new AbortController();

		fetchUsers(controller.signal, setData, setError);

		return () => controller.abort();
	}, [users.loading]);

	return {
		users: users.data,
		usersError: users.error,
		usersLoading: users.loading,
		reloadUsers
	};
};

const fetchUsers = async (signal, setData, setError) => {
	const { users, aborted } = await findAllUsers(signal);
	if (aborted) return;
	if (users) setData(users);
	else setError();
};

export default useUsers;
