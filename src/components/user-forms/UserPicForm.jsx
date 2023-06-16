import { useContext, useRef, useState } from 'react';
import { updateUserPic } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/context/UsersFormContext';
import { fileToDataUrl } from '../../lib/utils/file-utils';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PenciIIcon';
import PictureIcon from '../icons/PictureIcon';
import styles from './UserPicForm.module.css';

const ALLOWED_MIME_TYPE = ['image/jpeg', 'image/png'];
const MAX_SIZE = 102400;

const UserPicForm = ({ closeModal, currentUser }) => {
	const { onSuccess } = useContext(UsersFormContext);
	const [preview, setPreview] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const inputRef = useRef(null);

	const message = getMessage(preview);
	const hasPreview = preview && preview.src;

	return (
		<div className={styles.wrapper}>
			<div className={styles.preview}>
				{hasPreview ? (
					<img src={preview.src} alt='' />
				) : (
					<PictureIcon className={styles.icon} />
				)}
				<IconButton
					className={styles.iconButton}
					icon={PencilIcon}
					onClick={() => inputRef.current.click()}
					filled
				/>
			</div>
			{message}
			<input
				ref={inputRef}
				type='file'
				className={styles.input}
				accept={ALLOWED_MIME_TYPE.join(',')}
				onChange={ev => handleChange(ev, setPreview)}
			/>
			<Button
				disabled={isSubmitting || !preview || !preview.src}
				className={styles.button}
				onClick={() =>
					updatePic(
						currentUser.id,
						closeModal,
						onSuccess,
						preview,
						setIsSubmitting
					)
				}
			>
				{isSubmitting ? 'Cargando...' : 'Actualizar foto'}
			</Button>
		</div>
	);
};

const getMessage = preview => {
	if (!preview) return <span>JPG/PNG | Máx 100kb</span>;
	if (preview.filename)
		return <span className={styles.filename}>{preview.filename}</span>;

	return <span className={styles.error}>{preview.error}</span>;
};

const handleChange = async (ev, setPreview) => {
	const file = ev.target.files[0]; // Array con los archivos e imágenes capturados en el input.

	if (!file) return setPreview(); // Podemos poner el return ya que el valor de retorno no nos interesa para nada, no lo vamos a utilizar de manera directa, esto ocurre en casi todos los handlers. También cuano estemos retornando undefined o un return vacío

	if (!ALLOWED_MIME_TYPE.includes(file.type))
		return setPreview({
			error: 'Solo PNG/JPG'
		});

	if (MAX_SIZE < file.size) return setPreview({ error: 'Máximo tamaño 100kb' });

	try {
		const dataUrl = await fileToDataUrl(file);

		setPreview({
			src: dataUrl,
			filename: file.name
		});
	} catch (error) {
		setPreview({
			error: error.message
		});
	}
};

const updatePic = async (
	userId,
	closeModal,
	onSuccess,
	preview,
	setIsSubmitting
) => {
	if (!preview) return;

	setIsSubmitting(true);
	const success = await updateUserPic(userId, preview.src);

	if (success) {
		onSuccess();
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserPicForm;
