import SORT_OPTIONS from '../../constants/sortOptions';
import { USER_ROLE } from '../../constants/userRole';

export const filterByName = (users, search) => {
	const lowerCaseSearch = search.toLocaleLowerCase();
	if (!search) return [...users];

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCaseSearch)
	);
};

export const filterOnlyActive = (users, activeState) => {
	if (!activeState) return [...users];

	return users.filter(user => user.active);
};

export const sortUsers = (users, sortBy) => {
	const sortedUsers = [...users];

	switch (sortBy) {
		case SORT_OPTIONS.NAME:
			return sortedUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});

		case SORT_OPTIONS.ROLE:
			return sortedUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === USER_ROLE.TEACHER) return -1;
				if (a.role === USER_ROLE.STUDENT && b.role === USER_ROLE.OTHER)
					return -1;
				return 1;
			});
		case SORT_OPTIONS.ACTIVE:
			return sortedUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active && !b.active) return -1;
				return 1;
			});
		default:
			return sortedUsers;
	}
};

export const paginateUsers = (users, page, usersPerPage) => {
	const startIndex = (page - 1) * usersPerPage;
	const endIndex = startIndex + usersPerPage; // si estuvieramos en la página 0 el endIndex sería el 2, slice devuelve desde la posición inicial que se le indica en el primer parámetro a uno antes de la posición final, en este caso si el endIndex es 2 devolvería hasta el que este en la posición 1.
	const totalPages = Math.ceil(users.length / usersPerPage);

	const paginatedUsers = users.slice(startIndex, endIndex);

	return { totalPages, paginatedUsers };
};
