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
	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const { users, usersError, usersLoading, totalUsers } =
		useUsers(filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserFormProvider resetFilters={resetFilters}>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					{...filterSetters}
				/>
				<UserFormContainer />
				<UserListViewSelector showRowsFormat={showRowsFormat} setShowRowsFormat={setShowRowsFormat} />
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={showRowsFormat}
				/>
			</UserFormProvider>
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.userPerPage}
				{...paginationSetters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UserList;
