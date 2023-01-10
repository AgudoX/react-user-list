import UserRow from './UserRow';

const UsersListRows = ({ users }) => {
	if (users.length <= 0) return <p>No hay usuarios</p>;

	return users.map(user => <UserRow key={user.username} {...user} />);
};

export default UsersListRows;
