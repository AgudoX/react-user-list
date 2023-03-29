import Select from '../Form/Select';
import UserPagination from '../user/UserPagination';
import style from './UserListPagination.module.css';

const UserListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setUserPerPage,
	totalUsers
}) => {

	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={ev => setUserPerPage(Number(ev.target.value))}
				>
					<option value={4}>4</option>
					<option value={6}>6</option>
					<option value={8}>8</option>
				</Select>
				<p>Elementos por página</p>
			</div>
			<UserPagination page={page} setPage={setPage} totalPages={Math.ceil(totalUsers / itemsPerPage)} />
		</div>
	);
};

export default UserListPagination;
