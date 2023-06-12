import { useState } from 'react';
import SORT_OPTIONS from '../../constants/sortOptions';
import {
	onlyActiveChanged,
	searchChanged,
	sortByChanged
} from '../../lib/actions/filterActions';
import InputCheckbox from '../Form/InputCheckbox';
import InputSearch from '../Form/InputSearch';
import Select from '../Form/Select';
import Button from '../buttons/Button';
import Modal from '../modal/Modal';
import UserCreateForm from '../user-forms/UserCreateForm';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({ search, onlyActive, sortBy, dispatchFilters }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className={style.form}>
			<Modal closeModal={() => setShowModal(false)}>
				{showModal && <UserCreateForm closeModal={() => setShowModal(false)} />}
			</Modal>
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
				<Button onClick={() => setShowModal(true)}>Añadir usuario</Button>
			</div>
		</div>
	);
};

export default UsersListFilters;
