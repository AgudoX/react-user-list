import UserDisplay from './UserDisplay';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus.jsx';

const UserRow = ({
	username,
	name: displayName,
	active,
	role = 'Profesor'
}) => {
	return (
		<div className={style.user}>
			<div className={style.name}>
				<UserDisplay name={displayName} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}></div>
		</div>
	);
};

export default UserRow;
