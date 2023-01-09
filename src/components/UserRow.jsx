import { useContext } from 'react';
import { UsersContext } from '../lib/context/UsersContext';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus.jsx';

const UserRow = ({ id, name: displayName, active, role = 'Profesor' }) => {
	const { toggleUserActive } = useContext(UsersContext); // Una vez creado el contexto y exportado podemos importarlo mediante el hook useContext y pasandole como parámetro el nombre del contexto. UsersContext es un objeto que tiene como propiedades los values que se le pasan en el componente desde el que se exporta.

	return (
		<div className={style.user}>
			{/* Ejemplo del uso de style */}
			<div className={style.name}>
				<span>{displayName}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						toggleUserActive(id);
					}}
				>
					{active ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	);
};

export default UserRow;
