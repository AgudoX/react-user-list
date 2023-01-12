import { useFiltersUsers } from '../lib/hooks/useFiltersUser';
import {
	filterByName,
	filterOnlyActive,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers';
import style from './UserList.module.css';
import UserListPagination from './UserListPagination';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = ({ initialUsers }) => {
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setUserPerPage
	} = useFiltersUsers();

	const { users, totalPages } = getUsers(initialUsers, filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UsersListFilters
				search={filters.search}
				onlyActive={filters.onlyActive}
				sortBy={filters.sortBy}
				setSearch={setSearch}
				setOnlyActive={setOnlyActive}
				setSortBy={setSortBy}
			/>
			<UsersListRows users={users} />
			<UserListPagination
				page={filters.page}
				userPerPage={filters.userPerPage}
				setPage={setPage}
				setUserPerPage={setUserPerPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

const getUsers = (
	initialUsers,
	{ search, onlyActive, sortBy, page, userPerPage }
) => {
	let userFiltered = filterOnlyActive(initialUsers, onlyActive);
	userFiltered = filterByName(userFiltered, search);
	userFiltered = sortUsers(userFiltered, sortBy);
	const totalPages = Math.ceil(userFiltered.length / userPerPage);
	userFiltered = paginateUsers(userFiltered, page, userPerPage);

	return { users: userFiltered, totalPages };
};

export default UserList;
