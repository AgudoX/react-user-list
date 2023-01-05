import UserList from './components/UserList';

const USERS = [
	{
		id: 0,
		name: 'Javier Agudo Culebras',
		active: false,
		role: 'teacher'
	},
	{
		id: 1,
		name: 'Pablo Castellanos',
		active: true,
		role: 'student'
	},
	{
		id: 2,
		name: 'Luka Dolchi',
		active: true,
		role: 'blasd'
	},
	{
		id: 3,
		name: 'Jose Antonio',
		active: true,
		role: 'teacher'
	}
];

const App = () => <UserList initialUsers={USERS} />;

export default App;
