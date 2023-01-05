import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus.jsx';

const UserRow = ({
	id,
	name: displayName,
	active,
	role = 'Profesor',
	toggleUserActive
}) => {
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
