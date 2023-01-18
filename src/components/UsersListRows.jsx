import UserRow from './UserRow';

const UsersListRows = ({ users, error, loading }) => {
	if (loading) return <p>Cargando Usuarios...</p>;
	if (error) return <p>Se ha producido un error al cargar usuarios</p>;
	if (users.length <= 0) return <p>No hay usuarios</p>;

	return users.map(user => <UserRow key={user.id} {...user} />);
};

export default UsersListRows;
