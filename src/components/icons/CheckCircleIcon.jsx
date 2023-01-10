const CheckCircleIcon = props => (
	<svg
		fill='none' // hace referencia al relleno del icono
		stroke='currentColor' // Hace referencia al borde, color del borde igual al color del texto que acompañe al svg
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
			d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		></path>
	</svg>
);

export default CheckCircleIcon;
