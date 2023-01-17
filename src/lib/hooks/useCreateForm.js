import { useEffect, useState } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

export const useCreateForm = () => {
	const [userFormValues, setUserFormValues] = useState({
		name: { value: '', error: undefined },
		username: { value: '', loading: false, error: undefined }
	});

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

	const isFormValid =
		!userFormValues.name.value ||
		userFormValues.name.error ||
		userFormValues.name.loading ||
		!userFormValues.username.value ||
		userFormValues.username.error ||
		userFormValues.username.loading;

	return { ...userFormValues, setName, setUsername, isFormValid };
};

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
