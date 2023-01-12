import style from './IconButton.module.css';

const CLASSNAME = {
	black: {
		normal: style.black,
		fill: style.blackFilled
	},
	red: {
		normal: style.red,
		fill: style.redFilled
	}
};

const IconButton = ({
	kind = 'black',
	filled = true,
	icon: Icon,
	className,
	...props
}) => {
	const classNames = CLASSNAME[kind];
	const classNameFilled = filled ? 'fill' : 'normal';
	const kindClassName = classNames[classNameFilled];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className} `}
		>
			<Icon className={style.icon}></Icon>
			{/* El renombramiento de propiedades se suele usar para pasar un componente, ya que los componentes tienen que empezar en mayúsculas, no podemos directamente en mayúscula ya que las propiedades no deberían ir en mayúsculas. */}
		</button>
	);
};

export default IconButton;
