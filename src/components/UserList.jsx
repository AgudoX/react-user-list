import UserRow from './UserRow';
import style from './UserList.module.css';

const UserList = ({ users, children }) => {
	const userRendered =
		users.length > 0 ? (
			users.map(user => <UserRow key={users.name} {...user} />)
		) : (
			<p>No hay usuarios</p>
		);

	return (
		<div className={style.list}>
			{children}
			{userRendered}
		</div>
	);
};

export default UserList;
