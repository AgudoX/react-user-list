import SORT_OPTIONS from '../constants/sortOptions';
import InputCheckbox from './Form/InputCheckbox';
import InputSearch from './Form/InputSearch';
import Select from './Form/Select';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy
}) => {
	return (
		<form className={style.form}>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onInput={ev => {
						setSearch(ev.target.value);
					}}
				/>
				<Select
					value={sortBy}
					onChange={ev => setSortBy(Number(ev.target.value))}
				>
					<option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
					<option value={SORT_OPTIONS.NAME}>Por nombre</option>
					<option value={SORT_OPTIONS.ROLE}>Por rol</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>Por activación</option>
					)}
					{/* <option disabled={onlyActive} value={3}>
					Por activación
				</option> Segunda forma */}
				</Select>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						checked={onlyActive}
						className={style.checkbox}
						onChange={ev => setOnlyActive(ev.target.checked)}
					/>
					<p>Mostrar solo activos</p>
				</div>
			</div>
		</form>
	);
};

export default UsersListFilters;
