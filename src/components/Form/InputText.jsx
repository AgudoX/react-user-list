import style from './InputText.module.css';

const InputText = ({ label, error, className, ...props }) => (
	<label className={className}>
		<span className={style.label}>{label}</span>
		<input
			className={`${style.input} ${error ? style.borderError : ''}`}
			{...props}
			type='text'
		/>
		{error && <span className={style.error}>{error}</span>}
	</label>
);

export default InputText;
