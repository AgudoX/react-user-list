import { useEffect, useRef, useState } from 'react';

const useDropdown = () => {
	const [dropdownOpened, setDropdownOpened] = useState(false);
	const dropdownRef = useRef(null);

	const openDropdown = () => setDropdownOpened(true);
	const closeDropdown = () => setDropdownOpened(false);

	useEffect(() => {
		if (!dropdownOpened) return;

		const handleClickOutside = ev => {
			if (!dropdownRef.current.contains(ev.target)) closeDropdown(); // Capturamos el elemento del DOM al que le pongamos la ref, y con contains podemos comprobar si un nodo está dentro de otro nodo, ev.target recogería el nodo sobre el que se le hace click, y en caso de que no este dentro, se cierra.
		};

		document.addEventListener('click', handleClickOutside, { capture: true });
		return () =>
			document.removeEventListener('click', handleClickOutside, {
				capture: true
			});
	}, [dropdownOpened]);

	return { dropdownRef, dropdownOpened, openDropdown, closeDropdown };
};

export default useDropdown;
