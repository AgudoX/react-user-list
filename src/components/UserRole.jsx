import style from './UserRole.module.css';

const ROLE_STYLES = {
	teacher: ['Profesor', style.teacher],
	student: ['Student', style.student],
	other: ['Otro', style.other]
};

const UserRole = ({ role }) => {
	/* Creamos este objeto, para aplicar diferentes estilos a cada role. */

	/* En el caso de que sea porfesores o alumno hará destructuring de ROLE_STYLE['Profesor' o 'Alumno'], si no es niguno de esos hará el destructuring de other.
	 */

	/* rolClassName recoge el primer valor de la array que devuelve ROLE_STYLE['Profesor' o 'Alumno'] y roleClassStyle el segundo. */
	const [roleName, roleClass] = ROLE_STYLES[role] || ROLE_STYLES.other;

	/* Poner varias clases css: Otra forma es className = {[style.role, roleClass].join(' ')} pero no es la óptima */
	return <span className={`${roleClass} ${style.role}`}>{roleName}</span>;
};

export default UserRole;
