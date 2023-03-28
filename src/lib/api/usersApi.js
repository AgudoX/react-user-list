export const createUser = async user => {
	try {
		const res = await fetch('http://localhost:4000/users', {
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
		const res = await fetch(`http://localhost:4000/users/${user.id}`, {
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
		const res = await fetch(`http://localhost:4000/users/${userId}`, {
			method: 'DELETE'
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const findAllUsers = async (signal, { page, userPerPage }) => {
	try {
		const response = await fetch(
			`http://localhost:4000/users?_page=${page}&_limit=${userPerPage}`,
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
			`http://localhost:4000/users/?username=${username}`,
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
