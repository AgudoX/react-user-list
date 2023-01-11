import SORT_OPTIONS from '../../../constants/sortOptions';
import { USER_ROLE } from '../../../constants/userRole';

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
