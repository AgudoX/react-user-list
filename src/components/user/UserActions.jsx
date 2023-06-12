import { useState } from 'react';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PenciIIcon';
import TrashIcon from '../icons/ThrashIcon';
import UserDeleteForm from '../user-forms/UserDeleteForm';
import UserEditForm from '../user-forms/UserEditForm';
import Modal from '../modal/Modal';

const UserActions = ({ user }) => {
	const [modalContent, setModalContent] = useState();
	return (
		<>
			<Modal closeModal={() => setModalContent()}>{modalContent}</Modal>
			<IconButton
				icon={PencilIcon}
				onClick={() =>
					setModalContent(
						<UserEditForm
							closeModal={() => setModalContent()}
							currentUser={user}
						/>
					)
				}
			/>
			<IconButton
				icon={TrashIcon}
				kind='red'
				onClick={() =>
					setModalContent(
						<UserDeleteForm
							closeModal={() => setModalContent()}
							currentUser={user}
						/>
					)
				}
			/>
		</>
	);
};

export default UserActions;
