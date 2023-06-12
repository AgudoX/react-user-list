import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../api/usersApi';

import { usernameErrorChanged } from '../actions/editFormActions';
import {
	editFormReducer,
	getEditFormInitialState
} from '../reducers/editFormReducer';

export const useEditForm = user => {
	const [userFormValues, dispatchUserFormValues] = useReducer(
		editFormReducer,
		user,
		getEditFormInitialState
	);

	useEffect(() => {
		if (!userFormValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() =>
				validateUsernameIsAvailable(
					userFormValues.username.value,
					dispatchUserFormValues,
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
		dispatchUserFormValues,
		isFormInvalid
	};
};

// Devuelve true o false dependiendo de si los valores iniciales coinciden o no
const areInitialValues = (formValues, user) =>
	formValues.name === user.name &&
	formValues.username === user.username &&
	formValues.role === user.role &&
	formValues.active === user.active;

const validateUsernameIsAvailable = async (
	username,
	dispatchUserFormValues,
	signal
) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;

	let errorMessage;
	if (error) errorMessage = 'Error al validar';
	else if (user) errorMessage = 'Ya está en uso';

	dispatchUserFormValues(usernameErrorChanged(errorMessage));
};
