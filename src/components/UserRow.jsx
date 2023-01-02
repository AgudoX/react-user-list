import { useState } from 'react';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus.jsx';

const UserRow = ({ name: displayName, active, role = 'Profesor' }) => {
	const [isActive, setIsActive] = useState(active);

	return (
		<div className={style.user}>
			{/* Ejemplo del uso de style */}
			<div className={style.name}>
				<span>{displayName}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={isActive} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						setIsActive(!isActive);
					}}
				>
					{isActive ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	);
};

export default UserRow;
