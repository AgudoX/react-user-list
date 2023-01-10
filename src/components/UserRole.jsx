import style from './UserRole.module.css';

const ROLE_STYLES = {
	teacher: ['Profesor', style.teacher],
	student: ['Student', style.student],
	other: ['Otro', style.other]
};

const UserRole = ({ role }) => {
	const [roleName, roleClass] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return <span className={`${roleClass} ${style.role}`}>{roleName}</span>;
};

export default UserRole;
