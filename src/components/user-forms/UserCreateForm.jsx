import { useState } from 'react';
import { USER_ROLE } from '../../constants/userRole';
import { useCreateForm } from '../../lib/hooks/useCreateForm';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import InputCheckbox from '../Form/InputCheckbox';
import InputText from '../Form/InputText';
import InputTextAsync from '../Form/InputTextAsync';
import Select from '../Form/Select';
import CrossIcon from '../icons/CrossIcon';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ setFiltersForm }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, setUsername, setName } = useCreateForm();

	const isDisabled =
		!name.value ||
		name.error ||
		name.loading ||
		!username.value ||
		username.error ||
		username.loading;
	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={setFiltersForm}
			/>
			<form
				onSubmit={ev =>
					handleSubmit(ev, name, username, setIsSubmitting, setFiltersForm)
				}
			>
				<div className={style.row}>
					<InputText
						className={style.input}
						label='Nombre'
						placeholder='Brad Pitt'
						error={name.error}
						value={name.value}
						onChange={ev => setName(ev.target.value)}
					></InputText>
					<InputTextAsync
						label='Username'
						className={style.input}
						placeholder='bradpitt'
						success={username.value && !username.loading && !username.error}
						loading={username.loading}
						error={username.error}
						value={username.value}
						onChange={ev => setUsername(ev.target.value)}
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
					<Button disabled={isDisabled} type='submit'>
						{isSubmitting ? 'Cargando...' : 'Crear usuario'}
					</Button>
				</div>
			</form>
		</div>
	);
};

// Cuendo el handler de un evento aumenta mucho es mejor extraerlo y posteriormente pasarselo en forma de función.
const handleSubmit = async (
	ev,
	name,
	username,
	setIsSubmitting,
	setFiltersForm
) => {
	ev.preventDefault();
	setIsSubmitting(true);
	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};
	const res = await fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user) // Convertimos user en un JSON
	});

	if (res.ok) {
		// TODO: Actualizar usuarios después de que se cree uno nuevo.
		setFiltersForm();
	} else console.log('Error al crear usuario');
};

export default UserCreateForm;
