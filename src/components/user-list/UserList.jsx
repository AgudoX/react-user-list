import { useFiltersUsers } from '../../lib/hooks/useFiltersUser';
import useUsers from '../../lib/hooks/useUsers';
import { getUsersToDisplay } from '../../lib/users/filterUsers';
import UserFormProvider from '../providers/UsersFormProvider';
import UserFormContainer from '../user-forms/UserFormContainer';

import style from './UserList.module.css';
import UserListPagination from './UserListPagination';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = () => {
	const {
		filters,
		pagination,
		filterSetters,
		paginationSetters,
		resetFilters
	} = useFiltersUsers();

	const { users, usersError, usersLoading, reloadUsers } = useUsers();

	const { totalPages, paginatedUsers } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserFormProvider resetFilters={resetFilters} reloadUsers={reloadUsers}>
				<UsersListFilters {...filters} {...filterSetters} />
				<UserFormContainer />
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
				/>
			</UserFormProvider>
			<UserListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UserList;
