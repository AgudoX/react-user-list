import { useEffect, useRef, useState } from 'react';
import IconButton from '../buttons/IconButton';
import DotsIcon from '../icons/DotsIcon';
import PencilIcon from '../icons/PenciIIcon';
import TrashIcon from '../icons/ThrashIcon';
import Modal from '../modal/Modal';
import UserDeleteForm from '../user-forms/UserDeleteForm';
import UserEditForm from '../user-forms/UserEditForm';
import style from './UserActions.module.css';
import useDropdown from '../../lib/hooks/useDropdown';

const UserActions = ({ user }) => {
	const { modalContent, closeModal, openDeleteModal, openEditModal } =
		useModal(user);
	const { dropdownOpened, openDropdown, dropdownRef, closeDropdown } =
		useDropdown();

	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} onClick={openDropdown} />
			{dropdownOpened && (
				<ul
					className={style.dropdown}
					ref={dropdownRef}
					onClick={closeDropdown}
				>
					<li onClick={openEditModal}>
						<PencilIcon />
						<span>Editar</span>
					</li>
					<li onClick={openDeleteModal}>
						<TrashIcon />
						<span>Eliminar</span>
					</li>
				</ul>
			)}
		</div>
	);
};

const useModal = user => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => setModalContent();

	const openEditModal = () => {
		setModalContent(
			<UserEditForm closeModal={closeModal} currentUser={user} />
		);
	};

	const openDeleteModal = () => {
		setModalContent(
			<UserDeleteForm closeModal={closeModal} currentUser={user} />
		);
	};

	return { modalContent, closeModal, openDeleteModal, openEditModal };
};

export default UserActions;
