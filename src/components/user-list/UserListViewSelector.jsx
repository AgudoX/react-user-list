import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import style from './UserListViewSelector.module.css';

const UserListViewSelector = ({ showRowsFormat, setShowRowsFormat }) => {
	return (
		<div className={style.wrapper}>
			<button onClick={() => setShowRowsFormat(true)} disabled={showRowsFormat}>
				<GridIcon className={style.icon} />
			</button>
			<div className={style.divider}></div>
			<button onClick={() => setShowRowsFormat(false)} disabled={!showRowsFormat}>
				<ListIcon className={style.icon} />
			</button>
		</div>
	);
};

export default UserListViewSelector;
