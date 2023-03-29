import { UsersFormContext } from '../../lib/context/UsersFormContext';
import { useSelectedForm } from '../../lib/hooks/useSelectedForm';

const UserFormProvider = ({ children, resetFilters }) => {
	const { setFiltersForm, ...restSelectedForms } = useSelectedForm();

	const onSuccess = () => {
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
