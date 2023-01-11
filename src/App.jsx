import UserList from './components/UserList';
import { USER_ROLE } from './constants/userRole';

const USERS = [
	{
		username: 'javier',
		name: 'Javier Agudo Culebras',
		active: false,
		role: USER_ROLE.TEACHER
	},
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: USER_ROLE.STUDENT
	},
	{
		username: 'luka',
		name: 'Luka Dolchi',
		active: true,
		role: USER_ROLE.OTHER
	},
	{
		username: 'jose',
		name: 'Jose Antonio',
		active: true,
		role: USER_ROLE.TEACHER
	}
];

const App = () => <UserList initialUsers={USERS} />;

export default App;
