import { useState } from 'react';
import style from './UserList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...filterSetters } = useFiltersUsers();

	const { users } = useUsers(initialUsers);

	let userFiltered = filterOnlyActive(users, onlyActive);
	userFiltered = filterByName(userFiltered, search);
	userFiltered = sortUsers(userFiltered, sortBy);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...filterSetters}
			/>
			<UsersListRows users={userFiltered} />
		</div>
	);
};

const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);

	return { users };
};

const useFiltersUsers = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: 0
	});

	const setSearch = search => {
		setFilters({
			...filters,
			search
		});
	};

	const setOnlyActive = onlyActive => {
		if (onlyActive && filters.sortBy === 3)
			setFilters({
				...filters,
				onlyActive,
				sortBy: 0
			});
		else
			setFilters({
				...filters,
				onlyActive
			});
	};

	const setSortBy = sortBy => {
		setFilters({
			...filters,
			sortBy
		});
	};

	return {
		...filters,
		setSearch,
		setOnlyActive,
		setSortBy
	};
};

const filterByName = (users, search) => {
	const lowerCaseSearch = search.toLocaleLowerCase();
	if (!search) return [...users];

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCaseSearch)
	);
};

const filterOnlyActive = (users, activeState) => {
	if (!activeState) return [...users];

	return users.filter(user => user.active);
};

const sortUsers = (users, sortBy) => {
	const sortedUsers = [...users];

	switch (sortBy) {
		case 1: // En este caso tenemos que devolver una copia del array, ya que sort lo que hace es ordenar la array original y con la opción de 'por defecto' queremos volver a desordenarla, por ello lo que tenemos que ordenar es una copia, con filter esto no ocurre ya que crea una array nueva y deja intacta la original
			return sortedUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});

		case 2:
			return sortedUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === 'teacher') return -1;
				if (a.role === 'student' && b.role === 'other') return -1;
				return 1;
			});
		case 3:
			return sortedUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active && !b.active) return -1;
				return 1;
			});
		default:
			return sortedUsers;
	}
};

export default UserList;
