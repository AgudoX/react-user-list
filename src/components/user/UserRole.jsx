import { USER_ROLE } from '../../constants/userRole';
import style from './UserRole.module.css';

const ROLE_STYLES = {
	[USER_ROLE.TEACHER]: ['Profesor', style.teacher],
	[USER_ROLE.STUDENT]: ['Alumno', style.student],
	[USER_ROLE.OTHER]: ['Otro', style.other]
};

const UserRole = ({ role }) => {
	const [roleName, roleClass] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return <span className={`${roleClass} ${style.role}`}>{roleName}</span>;
};

export default UserRole;
