import { useContext, useState } from 'react';
import { USER_ROLE } from '../../constants/userRole';
import {
	activeChanged,
	nameChanged,
	roleChanged,
	usernameChanged
} from '../../lib/actions/editFormActions';
import { updateUser } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import { useEditForm } from '../../lib/hooks/useEditForm';
import InputCheckbox from '../Form/InputCheckbox';
import InputText from '../Form/InputText';
import InputTextAsync from '../Form/InputTextAsync';
import Select from '../Form/Select';
import Button from '../buttons/Button';
import style from './UserEditForm.module.css';

const UserEditForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UsersFormContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		username,
		name,
		role,
		active,
		dispatchUserFormValues,
		isFormInvalid
	} = useEditForm(currentUser);

	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(
					ev,
					{
						id: currentUser.id,
						name: name.value,
						username: username.value,
						role,
						active
					},
					setIsSubmitting,
					onSuccess,
					closeModal
				)
			}
		>
			<InputText
				label='Nombre'
				placeholder='Brad Pitt'
				error={name.error}
				value={name.value}
				onChange={ev => dispatchUserFormValues(nameChanged(ev.target.value))}
			></InputText>
			<InputTextAsync
				label='Username'
				placeholder='bradpitt'
				success={
					username.value !== currentUser.username &&
					!username.loading &&
					!username.error
				}
				loading={username.loading}
				error={username.error}
				value={username.value}
				onChange={ev => {
					console.log(ev.target.value, currentUser.username);
					dispatchUserFormValues(
						usernameChanged(ev.target.value, currentUser.username)
					);
				}}
			></InputTextAsync>
			<Select
				value={role}
				onChange={ev => dispatchUserFormValues(roleChanged(role))}
			>
				<option value={USER_ROLE.TEACHER}>Profesor</option>
				<option value={USER_ROLE.STUDENT}>Alumno</option>
				<option value={USER_ROLE.OTHER}>Otro</option>
			</Select>
			<div className={style.active}>
				<InputCheckbox
					checked={active}
					onChange={ev =>
						dispatchUserFormValues(activeChanged(ev.target.checked))
					}
				/>
				<span>¿Activo?</span>
			</div>
			<Button disabled={isSubmitting || isFormInvalid} type='submit'>
				{isSubmitting ? 'Cargando...' : 'Editar usuario'}
			</Button>
		</form>
	);
};

// Cuendo el handler de un evento aumenta mucho es mejor extraerlo y posteriormente pasarselo en forma de función.
const handleSubmit = async (
	ev,
	user,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();
	setIsSubmitting(true);

	const postSuccessfully = await updateUser(user);

	if (postSuccessfully) {
		onSuccess(); // Actualiza usuarios después de que se cree uno nuevo.
		closeModal();
	} else setIsSubmitting(false);
};

export default UserEditForm;
