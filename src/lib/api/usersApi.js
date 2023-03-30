import { environment } from "../../constants/environment";
import SORT_OPTIONS from "../../constants/sortOptions";

export const createUser = async user => {
	try {
		const res = await fetch(environment.apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user) // Convertimos user en un JSON
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const updateUser = async user => {
	try {
		const res = await fetch(`${environment.apiUrl}/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user) // Convertimos user en un JSON
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const deleteUserById = async userId => {
	try {
		const res = await fetch(`${environment.apiUrl}/${userId}`, {
			method: 'DELETE'
		});

		return res.ok;
	} catch {
		return false;
	}
};

const SORT_MAPPER = {
	[SORT_OPTIONS.NAME]: ['name', 'asc'],
	[SORT_OPTIONS.ROLE]: ['role', 'desc'],
	[SORT_OPTIONS.ACTIVE]: ['active', 'desc']
}

const getFindAllUrl = ({ page, userPerPage, search, onlyActive, sortBy }) => {
	const url = new URL(environment.apiUrl);
	url.searchParams.append('_page', page) // Le pasamos los query params de la url, en este caso _page = page
	url.searchParams.append('_limit', userPerPage) // El resultado final de la constante url es este http://localhost:4000/users?_page=${page}&_limit=${userPerPage}

	// Si existen search o anlyActive añade los filtros a la URL
	if (search) url.searchParams.append('name_like', search);
	if (onlyActive) url.searchParams.append('active', onlyActive);

	const sortProps = SORT_MAPPER[sortBy];

	if (sortProps) {
		const [sort, order] = sortProps
		url.searchParams.append('_sort', sort);
		url.searchParams.append('_order', order);
	}
	return url.href;
}

export const findAllUsers = async (signal, filters) => {

	const url = getFindAllUrl(filters)

	try {
		const response = await fetch(
			url,
			{ signal }
		);

		let users;
		if (response.ok) users = await response.json();

		return {
			users,
			count: response.ok ? response.headers.get('x-total-count') : 0,
			error: !response.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			users: undefined,
			count: 0,
			error: !isAborted,
			aborted: isAborted
		};
	}
};

export const findUserByUsername = async (username, signal) => {
	try {
		const response = await fetch(
			`${environment.apiUrl}/?username=${username}`,
			{ signal }
		);

		let user;
		if (response.ok) {
			const users = await response.json();
			user = users[0];
		}

		return {
			user,
			error: !response.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			user: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};
