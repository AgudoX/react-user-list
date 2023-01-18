import { useContext } from 'react';
import { USER_FORMS } from '../../constants/userForms';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import UserCreateForm from './UserCreateForm';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';
import style from './UserFormContainer.module.css';

const FORMS = {
	[USER_FORMS.CREATE]: <UserCreateForm />,
	[USER_FORMS.EDIT]: <UserEditForm />,
	[USER_FORMS.DELETE]: <UserDeleteForm />
};

const UserFormContainer = () => {
	const { setFiltersForm, currentForm } = useContext(UsersFormContext);
	const forms = FORMS[currentForm];

	if (!forms) return null;

	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={setFiltersForm}
			/>
			{forms}
		</div>
	);
};

export default UserFormContainer;
