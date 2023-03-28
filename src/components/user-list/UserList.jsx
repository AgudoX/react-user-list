import { useState } from 'react';
import { useFiltersUsers } from '../../lib/hooks/useFiltersUser';
import useUsers from '../../lib/hooks/useUsers';
import UserFormProvider from '../providers/UsersFormProvider';
import UserFormContainer from '../user-forms/UserFormContainer';

import style from './UserList.module.css';
import UserListPagination from './UserListPagination';
import UserListViewSelector from './UserListViewSelector';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = () => {
	const { filters, filterSetters, paginationSetters, resetFilters } =
		useFiltersUsers();
	const [view, setView] = useState(true);

	const { users, usersError, usersLoading, reloadUsers, usersCount } =
		useUsers(filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserFormProvider resetFilters={resetFilters} reloadUsers={reloadUsers}>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					{...filterSetters}
				/>
				<UserFormContainer />
				<UserListViewSelector view={view} setView={setView} />
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormProvider>
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.userPerPage}
				{...paginationSetters}
				totalPages={Math.ceil(usersCount / filters.userPerPage)}
			/>
		</div>
	);
};

export default UserList;
