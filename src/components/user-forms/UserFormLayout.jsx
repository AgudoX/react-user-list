import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import style from './UserFormLayout.module.css';

const UserFormLayout = ({ setFiltersForm, children }) => (
	<div className={style.wrapper}>
		<IconButton
			className={style.close}
			icon={CrossIcon}
			filled
			onClick={setFiltersForm}
		/>
		{children}
	</div>
);

export default UserFormLayout;
