const REGEX = {
	USERNAME: /^[a-z0-9]+$/,
	START_WITH_NUMBER: /^[0-9]/,
	NAME: /^[a-záéíóú\s-]+$/i
};

export const validateUsername = username => {
	if (!REGEX.USERNAME.test(username)) return 'Solo minúsculas y números';
	if (REGEX.START_WITH_NUMBER.test(username))
		return 'No puede empezar por número';

	if (username.length < 6 || username.length > 15)
		return 'Debe haber entre 6 y 15 caracteres';
};

export const validateName = name => {
	if (!REGEX.NAME.test(name)) return 'Solo letras, espacios y guiones';

	if (name.includes('  ')) return 'No puede contener espacios';

	if (name.includes('--')) return 'No puede contener doble guión';

	const nameSplitted = name.split(' ');
	for (const word of nameSplitted) {
		if (word.startsWith('-') || word.endsWith('-'))
			return 'No puede empezar ni terminar por un guión';
	}

	if (name.length < 2 || name.length > 12)
		return 'Debe haber entre 2 y 12 caracteres';
};
