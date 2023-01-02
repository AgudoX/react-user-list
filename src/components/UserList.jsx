import UserRow from './UserRow';
import style from './UserList.module.css';

const UserList = ({ users, children }) => {
	const userRendered =
		users.length > 0 ? (
			users.map(user => <UserRow key={user.name} {...user} />)
		) : (
			<p>No hay usuarios</p>
		);

	console.log(userRendered);
	return (
		<div className={style.list}>
			{children}
			{userRendered}
		</div>
	);
};

export default UserList;
