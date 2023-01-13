import { useFiltersUsers } from '../lib/hooks/useFiltersUser';
import useUsers from '../lib/hooks/useUsers';
import Button from './buttons/Button';
import InputTextAsync from './Form/InputTextAsync';
import style from './UserList.module.css';
import UserListPagination from './UserListPagination';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = () => {
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setUserPerPage
	} = useFiltersUsers();

	const { users, totalPages, error, loading } = useUsers(filters);

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
			<UsersListRows users={users} error={error} loading={loading} />
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

export default UserList;
