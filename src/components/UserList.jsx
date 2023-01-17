import { useState } from 'react';
import { USER_FORMS } from '../constants/userForms';
import { useFiltersUsers } from '../lib/hooks/useFiltersUser';
import useUsers from '../lib/hooks/useUsers';
import {
	filterByName,
	filterOnlyActive,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers';
import Button from './buttons/Button';
import UserCreateForm from './user-forms/UserCreateForm';
import UserFormLayout from './user-forms/UserFormLayout';
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
	const { currentForm, setCreateForm, setFiltersForm } = useForm();
	const { totalPages, paginatedUsers } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					{...filters}
					{...filterSetters}
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UserFormLayout setFiltersForm={setFiltersForm}>
					<UserCreateForm onSuccess={onSuccess} />
				</UserFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
			/>
			<UserListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy },
	{ page, userPerPage }
) => {
	let userFiltered = filterOnlyActive(users, onlyActive);
	userFiltered = filterByName(userFiltered, search);
	userFiltered = sortUsers(userFiltered, sortBy);

	const { totalPages, paginatedUsers } = paginateUsers(
		userFiltered,
		page,
		userPerPage
	);

	return { totalPages, paginatedUsers };
};

const useForm = () => {
	const [currentForm, setCurrentForm] = useState(USER_FORMS.FILTERS);

	const setFiltersForm = () => setCurrentForm(USER_FORMS.FILTERS);
	const setCreateForm = () => setCurrentForm(USER_FORMS.CREATE);
	const setEditForm = () => setCurrentForm(USER_FORMS.EDIT);
	const setDeleteForm = () => setCurrentForm(USER_FORMS.DELETE);

	return {
		currentForm,
		setCreateForm,
		setDeleteForm,
		setEditForm,
		setFiltersForm
	};
};

export default UserList;
