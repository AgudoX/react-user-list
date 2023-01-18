import { useContext } from 'react';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PenciIIcon';
import TrashIcon from '../icons/ThrashIcon';
import UserDisplay from '../user/UserDisplay';
import UserRole from '../user/UserRole';
import UserStatus from '../user/UserStatus.jsx';
import style from './UserRow.module.css';

const UserRow = ({ id, username, name, active, role = 'Profesor' }) => {
	const { setDeleteForm, setEditForm } = useContext(UsersFormContext);

	return (
		<div className={style.user}>
			<div className={style.name}>
				<UserDisplay name={name} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<IconButton
					icon={PencilIcon}
					onClick={() => setEditForm({ id, username, name, active, role })}
				/>
				<IconButton
					icon={TrashIcon}
					kind='red'
					onClick={() => setDeleteForm({ id, name })}
				/>
			</div>
		</div>
	);
};

export default UserRow;
