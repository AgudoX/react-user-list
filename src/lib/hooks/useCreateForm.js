import { useEffect, useState } from 'react';
import { validateName, validateUsername } from '../users/userValidations';

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	let error;

	try {
		const response = await fetch(
			`http://localhost:4000/users/?username=${username}`,
			{ signal }
		);
		if (response.ok) {
			const data = await response.json();
			if (data.length) error = 'Ya está en uso';
		} else {
			error = 'Error al validar la respuesta';
		}
	} catch (err) {
		if (err.name === 'AbortError') return;
		error = 'Error al validar la respuesta';
	}

	setUsernameError(error);
};

export const useCreateForm = () => {
	const [userFormValues, setUserFormValues] = useState({
		name: { value: '', error: undefined },
		username: { value: '', loading: false, error: undefined }
	});

	useEffect(() => {
		if (userFormValues.username.loading) {
			const controller = new AbortController();
			const timeoutId = setTimeout(
				() =>
					validateUsernameIsAvailable(
						userFormValues.username.value,
						setUsernameError,
						controller.signal
					),
				500
			);

			return () => {
				controller.abort();
				clearTimeout(timeoutId);
			};
		}
	}, [userFormValues.username.loading, userFormValues.username.value]);

	const setName = newName => {
		const error = validateName(newName);
		setUserFormValues({
			...userFormValues,
			name: { value: newName, error }
		});
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		setUserFormValues({
			...userFormValues,
			username: { value: newUsername, loading: !error, error }
		});
	};

	const setUsernameError = error =>
		setUserFormValues(previusValue => ({
			...previusValue,
			username: {
				loading: false,
				value: previusValue.username.value,
				error
			}
		}));

	return { ...userFormValues, setName, setUsername };
};
