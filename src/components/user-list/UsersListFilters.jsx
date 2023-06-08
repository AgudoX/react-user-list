import { useContext } from 'react';
import SORT_OPTIONS from '../../constants/sortOptions';
import { USER_FORMS } from '../../constants/userForms';
import {
	onlyActiveChanged,
	searchChanged,
	sortByChanged
} from '../../lib/actions/filterActions';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import InputCheckbox from '../Form/InputCheckbox';
import InputSearch from '../Form/InputSearch';
import Select from '../Form/Select';
import Button from '../buttons/Button';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({ search, onlyActive, sortBy, dispatchFilters }) => {
	const { setCreateForm, currentForm } = useContext(UsersFormContext);

	if (currentForm !== USER_FORMS.FILTERS) return null;
	return (
		<form className={style.form}>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onInput={ev => {
						dispatchFilters(searchChanged(ev.target.value));
					}}
				/>
				<Select
					value={sortBy}
					onChange={ev => dispatchFilters(sortByChanged(ev.target.value))}
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
						onChange={ev =>
							dispatchFilters(onlyActiveChanged(ev.target.checked))
						}
					/>
					<p>Mostrar solo activos</p>
				</div>
				<Button onClick={setCreateForm}>Añadir usuario</Button>
				{/* Ponemos un slot en vez de un botón pq este componente semánticamente no pertenece a los filtros, puede ser cualquier cosa en un futuro. */}
			</div>
		</form>
	);
};

export default UsersListFilters;
