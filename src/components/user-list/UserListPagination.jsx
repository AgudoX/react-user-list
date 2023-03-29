import { PAGINATION } from '../../constants/pagination';
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
					{PAGINATION.ITEMS_PER_PAGE_VALUES.map(value => (
						<option key={value} value={value}>{value}</option>
					))}

				</Select>
				<p>Elementos por página</p>
			</div>
			<UserPagination page={page} setPage={setPage} totalPages={Math.ceil(totalUsers / itemsPerPage)} />
		</div>
	);
};

export default UserListPagination;
