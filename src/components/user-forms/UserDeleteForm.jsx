import { useContext, useState } from 'react';
import { deleteUserById } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import { alertBox } from '../../lib/events/alertEvents';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ currentUser, closeModal }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { onSuccess } = useContext(UsersFormContext);
	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p>
				¿Estás seguro de que deseas eliminar al usuario {'"'}
				{currentUser.name}
				{'"'}?
			</p>
			<Button
				disabled={isSubmitting}
				kind='secondary'
				type='submit'
				onClick={closeModal}
			>
				{isSubmitting ? 'Cargando...' : 'Cancelar'}
			</Button>
			<Button disabled={isSubmitting} type='submit'>
				{isSubmitting ? 'Cargando...' : 'ELiminar usuario'}
			</Button>
		</form>
	);
};

// Cuendo el handler de un evento aumenta mucho es mejor extraerlo y posteriormente pasarselo en forma de función.
const handleSubmit = async (
	ev,
	userId,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();
	setIsSubmitting(true);

	const deleteSuccessfully = await deleteUserById(userId);

	if (deleteSuccessfully) {
		onSuccess(); // Actualiza usuarios después de que se cree uno nuevo.
		alertBox.success('Usuario borrado correctamente');
	} else alertBox.error('Error al borrar usuario');
	closeModal();
};

export default UserDeleteForm;
