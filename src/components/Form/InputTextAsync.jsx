import CheckCircleIcon from '../icons/CheckCircleIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';
import UpdateIcons from '../icons/UpdateIcons';
import style from './InputTextAsync.module.css';
const InputTextAsync = ({
	label,
	loading,
	success,
	error,
	className,
	...props
}) => {
	// Hay que ponerle label para que queden bien los estilos
	const icon = getIcon(loading, error, success);
	return (
		<label className={`${style.wrapper} ${className || ''}`}>
			<span className={style.label}>{label}</span>
			<input
				className={`${style.input} ${error ? style.borderError : ''}`}
				{...props}
				type='text'
			/>
			{icon}
			{error && <span className={style.error}>{error}</span>}
		</label>
	);
};
const getIcon = (loading, error, success) => {
	if (loading) return <UpdateIcons className={style.loadingIcon} />;
	if (success) return <CheckCircleIcon className={style.successIcon} />;
	if (error) return <CrossCircleIcon className={style.errorIcon} />;

	return null;
};
export default InputTextAsync;
