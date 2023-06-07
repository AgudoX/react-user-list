import { useContext, useState } from 'react';
import { USER_ROLE } from '../../constants/userRole';
import { createUser } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import { useCreateForm } from '../../lib/hooks/useCreateForm';
import InputCheckbox from '../Form/InputCheckbox';
import InputText from '../Form/InputText';
import InputTextAsync from '../Form/InputTextAsync';
import Select from '../Form/Select';
import Button from '../buttons/Button';
import style from './UserCreateForm.module.css';
import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';

const UserCreateForm = () => {
	const { onSuccess } = useContext(UsersFormContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, dispatchFormValues, isFormInvalid } = useCreateForm();

	return (
		<form
			onSubmit={ev =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess)
			}
		>
			<div className={style.row}>
				<InputText
					className={style.input}
					label='Nombre'
					placeholder='Brad Pitt'
					error={name.error}
					value={name.value}
					onChange={ev =>
						dispatchFormValues({
							type: CREATE_FORM_ACTIONS.NAME,
							value: ev.target.value
						})
					}
				></InputText>
				<InputTextAsync
					label='Username'
					className={style.input}
					placeholder='bradpitt'
					success={username.value && !username.loading && !username.error}
					loading={username.loading}
					error={username.error}
					value={username.value}
					onChange={ev =>
						dispatchFormValues({
							type: CREATE_FORM_ACTIONS.USERNAME,
							value: ev.target.value
						})
					}
				></InputTextAsync>
			</div>
			<div className={style.row}>
				<Select name='role'>
					<option value={USER_ROLE.TEACHER}>Profesor</option>
					<option value={USER_ROLE.STUDENT}>Alumno</option>
					<option value={USER_ROLE.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox name='active' />
					<span>¿Activo?</span>
				</div>
				<Button disabled={isSubmitting || isFormInvalid} type='submit'>
					{isSubmitting ? 'Cargando...' : 'Crear usuario'}
				</Button>
			</div>
		</form>
	);
};

// Cuendo el handler de un evento aumenta mucho es mejor extraerlo y posteriormente pasarselo en forma de función.
const handleSubmit = async (ev, name, username, setIsSubmitting, onSuccess) => {
	ev.preventDefault();
	setIsSubmitting(true);
	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};

	const postSuccessfully = await createUser(user); // Como queremos una unica responsabilidad hemos creado la función createUser que se encargará de la gestión de la petición post y así la separamos del handleSubmit.

	if (postSuccessfully) {
		onSuccess(); // Actualiza usuarios después de que se cree uno nuevo.
	} else setIsSubmitting(false);
};

export default UserCreateForm;
