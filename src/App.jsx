import UserList from './components/UserList';

const USERS = [
	{
		name: 'Javier Agudo Culebras',
		active: false,
		role: 'teacher'
	},
	{
		name: 'Pablo Castellanos',
		active: true,
		role: 'student'
	},
	{
		name: 'Luka Dolchi',
		active: true,
		role: 'blasd'
	}
];
// Covertimos App en un componente pasandolo a mayúscula y devolviendo una función.
// Lo convertimos en un componente ya que una de las características de estos es que tienen su propio ciclo de vida, y App no es una excepción.

const App = () => (
	<UserList users={USERS}>
		<h1>Listado de Usuarios</h1>
	</UserList>
);

export default App;
