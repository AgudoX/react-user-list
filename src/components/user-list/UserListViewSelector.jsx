import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import style from './UserListViewSelector.module.css';

const UserListViewSelector = ({ view, setView }) => {
	return (
		<div className={style.wrapper}>
			<button onClick={() => setView(true)} disabled={view}>
				<GridIcon className={style.icon} />
			</button>
			<div className={style.divider}></div>
			<button onClick={() => setView(false)} disabled={!view}>
				<ListIcon className={style.icon} />
			</button>
		</div>
	);
};

export default UserListViewSelector;
