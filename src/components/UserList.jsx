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
import UserDeleteForm from './user-forms/UserDeleteForm';
import UserEditForm from './user-forms/UserEditForm';
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
	const {
		currentForm,
		currentUser,
		setCreateForm,
		setFiltersForm,
		setEditForm,
		setDeleteForm
	} = useForm();

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
					{currentForm === USER_FORMS.CREATE && (
						<UserCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USER_FORMS.EDIT && (
						<UserEditForm onSuccess={onSuccess} user={currentUser} />
					)}
					{currentForm === USER_FORMS.DELETE && (
						<UserDeleteForm
							onSuccess={onSuccess}
							onCancel={setFiltersForm}
							user={currentUser}
						/>
					)}
				</UserFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
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
	const [currentForm, setCurrentForm] = useState({ form: USER_FORMS.FILTERS });

	const setFiltersForm = () => setCurrentForm({ form: USER_FORMS.FILTERS });
	const setCreateForm = () => setCurrentForm({ form: USER_FORMS.CREATE });
	// Tanto al formulario de edición como al de borrado hay que pasarles el usuario que se quiere borrar o eliminar
	const setEditForm = user => setCurrentForm({ form: USER_FORMS.EDIT, user });
	const setDeleteForm = user =>
		setCurrentForm({ form: USER_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setCreateForm,
		setDeleteForm,
		setEditForm,
		setFiltersForm
	};
};

export default UserList;
