import UserList from './components/UserList';

const USERS = [
	{
		username: 'javier',
		name: 'Javier Agudo Culebras',
		active: false,
		role: 'teacher'
	},
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: 'student'
	},
	{
		username: 'luka',
		name: 'Luka Dolchi',
		active: true,
		role: 'other'
	},
	{
		username: 'jose',
		name: 'Jose Antonio',
		active: true,
		role: 'teacher'
	}
];

const App = () => <UserList initialUsers={USERS} />;

export default App;
