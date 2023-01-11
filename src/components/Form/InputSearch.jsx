import SeacrhIcon from '../icons/SearchIcon';
import style from './InputSearch.module.css';

const InputSearch = ({ className, ...props }) => (
	<div className={`${style.wrapper} ${className || ''}`}>
		<SeacrhIcon className={style.icon} />
		<input className={style.input} {...props} type='text' />
	</div>
);

export default InputSearch;
