import { useEffect, useState } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

export const useEditForm = user => {
	const [userFormValues, setUserFormValues] = useState(() =>
		getInitialState(user)
	);

	const setName = newName => {
		const error = validateName(newName);
		setUserFormValues({
			...userFormValues,
			name: { value: newName, error }
		});
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		const isInitialValue = newUsername === user.username;
		setUserFormValues({
			...userFormValues,
			username: {
				value: newUsername,
				loading: !isInitialValue && !error,
				error
			}
		});
	};

	const setRole = newRole => {
		setUserFormValues({
			...userFormValues,
			role: newRole
		});
	};

	const setActive = newActive => {
		setUserFormValues({
			...userFormValues,
			active: newActive
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

	useEffect(() => {
		setUserFormValues(getInitialState(user));
	}, [user]);

	useEffect(() => {
		if (!userFormValues.username.loading) return;

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
	}, [userFormValues.username.loading, userFormValues.username.value]);

	const isFormInvalid =
		areInitialValues(userFormValues, user) ||
		userFormValues.name.error ||
		userFormValues.username.error ||
		userFormValues.username.loading;

	return {
		...userFormValues,
		setName,
		setUsername,
		setActive,
		setRole,
		isFormInvalid
	};
};

const getInitialState = user => ({
	name: { value: user.name, error: undefined },
	username: { value: user.username, loading: false, error: undefined },
	role: user.role,
	active: user.active
});

// Devuelve true o false dependiendo de si los valores iniciales coinciden o no
const areInitialValues = (formValues, user) =>
	formValues.name === user.name &&
	formValues.username === user.username &&
	formValues.role === user.role &&
	formValues.active === user.active;

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;
	if (error) return setUsernameError('Error al validar');

	user ? setUsernameError('Ya está en uso') : setUsernameError(undefined);
};
