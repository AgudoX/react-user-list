import { useContext, useState } from 'react';
import { deleteUserById } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { currentUser, setFiltersForm, onSuccess } =
		useContext(UsersFormContext);
	return (
		<form
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess)
			}
		>
			<p className={style.text}>
				¿Estás seguro de que deseas eliminar al usuario {'"'}
				{currentUser.name}
				{'"'}?
			</p>
			<div className={style.row}>
				<Button
					disabled={isSubmitting}
					kind='secondary'
					type='submit'
					onClick={setFiltersForm}
				>
					{isSubmitting ? 'Cargando...' : 'Cancelar'}
				</Button>
				<Button disabled={isSubmitting} type='submit'>
					{isSubmitting ? 'Cargando...' : 'ELiminar usuario'}
				</Button>
			</div>
		</form>
	);
};

// Cuendo el handler de un evento aumenta mucho es mejor extraerlo y posteriormente pasarselo en forma de función.
const handleSubmit = async (ev, userId, setIsSubmitting, onSuccess) => {
	ev.preventDefault();
	setIsSubmitting(true);

	const deleteSuccessfully = await deleteUserById(userId);

	if (deleteSuccessfully) {
		onSuccess(); // Actualiza usuarios después de que se cree uno nuevo.
	} else setIsSubmitting(false);
};

export default UserDeleteForm;
