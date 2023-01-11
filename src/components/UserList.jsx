import { useState } from 'react';
import {
	filterByName,
	filterOnlyActive,
	sortUsers
} from '../lib/context/users/filterUsers';
import { useFiltersUsers } from '../lib/hooks/useFiltersUser';
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

export default UserList;
