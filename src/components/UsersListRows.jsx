import UserRow from './UserRow';

const UsersListRows = ({ users, toggleUserActive }) => {
	if (users.length <= 0) return <p>No hay usuarios</p>;

	return users.map(user => (
		<UserRow key={user.id} {...user} toggleUserActive={toggleUserActive} />
	));
};

export default UsersListRows;
