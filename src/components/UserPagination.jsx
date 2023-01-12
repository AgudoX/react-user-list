import IconButton from './buttons/IconButton';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import style from './UserPagination.module.css';

const UserPagination = ({ page, setPage, totalPages }) => {
	return (
		<div className={style.wrapper}>
			<IconButton
				icon={ArrowLeftIcon}
				disabled={page <= 1 ? true : ''}
				onClick={() => setPage(page - 1)}
				className={style.icons}
			/>
			<span className={style.page}>
				Página {page} de {totalPages || 1}
			</span>
			<IconButton
				icon={ArrowRightIcon}
				disabled={page >= totalPages || totalPages === 0 ? true : ''}
				onClick={() => setPage(page + 1)}
				className={style.icons}
			/>
		</div>
	);
};

export default UserPagination;
