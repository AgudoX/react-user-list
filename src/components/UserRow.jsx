import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus.jsx';

const UserRow = ({
	name: displayName,
	active,
	role = 'Profesor',
	...restProps
}) => (
	<div className={style.user} {...restProps}>
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
	</div>
);

export default UserRow;
