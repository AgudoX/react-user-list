import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';


const formValuesReducer = (state, action) => {
	switch (action.type) {
		case 'name_changed': {
			const error = validateName(action.value)

			return ({
				...state,
				name: { value: action.value, error }
			})
		}
		case 'username_changed': {
			const error = validateUsername(action.value);
			const isInitialValue = action.value === action.currentUsername;
			return ({
				...state,
				username: {
					value: action.value,
					loading: !isInitialValue && !error,
					error
				}
			})
		}
		case 'role_changed': {
			return {
				...state,
				role: action.value
			}
		}
		case 'active_changed': {
			return {
				...state,
				active: action.value
			}
		}
		case 'username_error_changed': {
			return {
				...state,
				username: {
					loading: false,
					value: state.username.value,
					error: action.value
				}
			}
		}
		case 'replace':
			return action.value

		default:
			throw new Error('Invalid action type')

	}
}


export const useEditForm = user => {

	const [userFormValues, dispatchUserFormValues] = useReducer(formValuesReducer, user, getInitialState);


	useEffect(() => {
		dispatchUserFormValues({ type: 'replace', value: getInitialState(user) });
	}, [user]);

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
	dispatchUserFormValues,
	signal
) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;
	if (error) return dispatchUserFormValues({ type: 'username_error_changed', value: 'Error al validar' });

	dispatchUserFormValues({
		type: 'username_error_changed',
		value: user ? 'Ya está en uso' : undefined
	})
};
