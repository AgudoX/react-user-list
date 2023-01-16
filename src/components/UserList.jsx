import { useState } from 'react';
import { USER_FORMS } from '../constants/userForms';
import { useFiltersUsers } from '../lib/hooks/useFiltersUser';
import useUsers from '../lib/hooks/useUsers';
import Button from './buttons/Button';
import UserCreateForm from './user-forms/UserCreateForm';
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

	const { currentForm, setCreateForm, setFiltersForm } = useForm();

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					setSearch={setSearch}
					setOnlyActive={setOnlyActive}
					setSortBy={setSortBy}
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UserCreateForm {...{ setFiltersForm }} />
			)}

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
