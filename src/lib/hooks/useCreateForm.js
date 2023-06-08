import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../api/usersApi';
import {
	CREATE_FORM_INITIAL_STATE,
	createFormReducer
} from '../reducers/createFormReducer';

import { usernameErrorChanged } from '../actions/createFormActions.js';

export const useCreateForm = () => {
	const [userFormValues, dispatchFormValues] = useReducer(
		createFormReducer,
		CREATE_FORM_INITIAL_STATE
	);

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

	let errorMessage;

	if (error) errorMessage = 'Error al validar';
	else if (user) errorMessage = 'Ya está en uso';

	dispatchFormValues(usernameErrorChanged(errorMessage));
};
