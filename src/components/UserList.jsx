import { useState } from 'react';
import style from './UserList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...filterSetters } = useFiltersUsers();

	const { toggleUserActive, users } = useUsers(initialUsers);

	let userFiltered = filterOnlyActive(users, onlyActive);
	userFiltered = filterByName(userFiltered, search);
	userFiltered = sortByName(userFiltered, sortBy);

	return (
		<div className={style.list}>
			<h1>Listado de Usuarios</h1>
			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...filterSetters}
			/>
			<UsersListRows users={userFiltered} toggleUserActive={toggleUserActive} />
		</div>
	);
};

const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);

	const toggleUserActive = userId => {
		const newUsers = [...users]; // Hay que hacer copia porque sino no activará y desactivará los usuarios.

		const userIndex = newUsers.findIndex(user => user.id === userId); // Devuelve la posición del array en el que se encuentra un usuario.

		if (userIndex === -1) return;

		newUsers[userIndex].active = !newUsers[userIndex].active; // Cambiamos el estado del usuario.

		setUsers(newUsers);
	};

	return { toggleUserActive, users };
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
		user.name.toLowerCase().startsWith(lowerCaseSearch)
	);
};

const filterOnlyActive = (users, activeState) => {
	if (!activeState) return [...users];

	return users.filter(user => user.active);
};

const sortByName = (users, sortBy) => {
	const sortedUsers = [...users];

	switch (sortBy) {
		case 1: // En este caso tenemos que devolver una copia del array, ya que sort lo que hace es ordenar la array original y con la opción de 'por defecto' queremos volver a desordenarla, por ello lo que tenemos que ordenar es una copia, con filter esto no ocurre ya que crea una array nueva y deja intacta la original
			return sortedUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		default:
			return sortedUsers;
	}
};

export default UserList;
