import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

const formValuesReducer = (state, action) => {
	switch (action.type) {
		case 'name_changed': {
			const error = validateName(action.value);
			return {
				...state,
				name: { value: action.value, error }
			};
		}
		case 'username_changed': {
			const error = validateUsername(action.value);
			return {
				...state,
				username: {
					value: action.value,
					loading: !error,
					error
				}
			};
		}
		case 'username_error_changed': {
			return {
				...state,
				username: {
					loading: false,
					value: state.username.value,
					error: action.value
				}
			};
		}
		default:
			throw new Error(
				'Parece que ha ocurrido un error al crear un nuevo usuario'
			);
	}
};

export const useCreateForm = () => {
	const [userFormValues, dispatchFormValues] = useReducer(formValuesReducer, {
		name: { value: '', error: undefined },
		username: { value: '', loading: false, error: undefined }
	});

	useEffect(() => {
		if (!userFormValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() =>
				validateUsernameIsAvailable(
					userFormValues.username.value,
					dispatchFormValues,
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
		!userFormValues.name.value ||
		userFormValues.name.error ||
		userFormValues.name.loading ||
		!userFormValues.username.value ||
		userFormValues.username.error ||
		userFormValues.username.loading;

	return { ...userFormValues, dispatchFormValues, isFormInvalid };
};

const validateUsernameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;
	if (error)
		return dispatchFormValues({
			type: 'username_error_changed',
			value: 'Error al validar'
		});

	dispatchFormValues({
		type: 'username_error_changed',
		value: user ? 'Ya está en uso' : undefined
	});
};
