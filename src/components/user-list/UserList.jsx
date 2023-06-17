import { useReducer, useState } from 'react';
import useUsers from '../../lib/hooks/useUsers';

import { reset } from '../../lib/actions/filterActions';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import {
	FILTERS_INITIAL_STATE,
	filtersReducer
} from '../../lib/reducers/filtersReducer';
import AlertBox from '../alerts/AlertBox';
import style from './UserList.module.css';
import UserListPagination from './UserListPagination';
import UserListViewSelector from './UserListViewSelector';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UserList = () => {
	const [filters, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_STATE
	);

	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const { users, usersError, usersLoading, totalUsers } = useUsers(filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<AlertBox />
			<UsersFormContext.Provider
				value={{ onSuccess: () => dispatchFilters(reset()) }}
			>
				{' '}
				{/* Aquí en vez de hacer prop drilling pasamos directamente la ejecución de dispatch, de esta manera cuando se ejecute resetFilters en el UserForm Provider llevará a acabo esta acción directamente, si resetFilters en UserFormProvider recibiera un parámetro, para utilizarlo aquí, tendríamos que escribirlo entre los paréntesis  de la función que está inicializando la prop resetFilters aquí. */}
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>
				<UserListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={showRowsFormat}
				/>
			</UsersFormContext.Provider>
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.userPerPage}
				dispatchFilters={dispatchFilters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UserList;
