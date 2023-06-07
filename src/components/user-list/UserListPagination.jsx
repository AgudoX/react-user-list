import { FILTER_ACTIONS } from '../../constants/filterActions';
import { PAGINATION } from '../../constants/pagination';
import Select from '../Form/Select';
import UserPagination from '../user/UserPagination';
import style from './UserListPagination.module.css';

const UserListPagination = ({
	page,
	itemsPerPage,
	totalUsers,
	dispatchFilters
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={ev =>
						dispatchFilters({
							type: FILTER_ACTIONS.ITEMS_PER_PAGE,
							value: Number(ev.target.value)
						})
					}
				>
					{PAGINATION.ITEMS_PER_PAGE_VALUES.map(value => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</Select>
				<p>Elementos por página</p>
			</div>
			<UserPagination
				page={page}
				dispatchFilters={dispatchFilters}
				totalPages={Math.ceil(totalUsers / itemsPerPage)}
			/>
		</div>
	);
};

export default UserListPagination;
