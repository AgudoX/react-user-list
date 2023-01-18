import { UsersFormContext } from '../../lib/context/UsersFormContext';
import { useSelectedForm } from '../../lib/hooks/useSelectedForm';

const UserFormProvider = ({ children, reloadUsers, resetFilters }) => {
	const { setFiltersForm, ...restSelectedForms } = useSelectedForm();

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<UsersFormContext.Provider
			value={{
				...restSelectedForms,
				onSuccess,
				setFiltersForm
			}}
		>
			{children}
		</UsersFormContext.Provider>
	);
};

export default UserFormProvider;
