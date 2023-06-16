export const fileToDataUrl = file =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.addEventListener('loadend', () => resolve(fileReader.result)); // convierte un archivo a una url de datos

		fileReader.addEventListener('abort', () =>
			reject(new Error('Error al procesar'))
		);
		fileReader.addEventListener('error', () =>
			reject(new Error('Error al procesar'))
		);

		fileReader.readAsDataURL(file);
	});
