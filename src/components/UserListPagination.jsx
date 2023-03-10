import Select from './Form/Select';
import style from './UserListPagination.module.css';
import UserPagination from './UserPagination';
const UserListPagination = ({
	page,
	userPerPage,
	setPage,
	setUserPerPage,
	totalPages
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={userPerPage}
					onChange={ev => setUserPerPage(Number(ev.target.value))}
				>
					<option value={4}>4</option>
					<option value={6}>6</option>
					<option value={8}>8</option>
				</Select>
				<p>Elementos por página</p>
			</div>
			<UserPagination page={page} setPage={setPage} totalPages={totalPages} />
		</div>
	);
};

export default UserListPagination;
