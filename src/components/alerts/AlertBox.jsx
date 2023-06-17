import { useEffect, useState } from 'react';
import { ALERT_KINDS } from '../../constants/alertKinds';
import { alertBox } from '../../lib/events/alertEvents';
import styles from '../alerts/AlertBox.module.css';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';

const ICONS = {
	[ALERT_KINDS.SUCCESS]: CheckCircleIcon,
	[ALERT_KINDS.ERROR]: CrossCircleIcon
};

const STYLES = {
	[ALERT_KINDS.SUCCESS]: styles.success,
	[ALERT_KINDS.ERROR]: styles.error
};

const AlertBox = () => {
	const alert = useAlert();

	if (!alert) return null;
	const Icon = ICONS[alert.kind];

	const className = STYLES[alert.kind];
	if (!Icon || !className) return null;

	return (
		<div className={className}>
			<Icon className={styles.icon} />
			<p>{alert.message}</p>
		</div>
	);
};

const useAlert = () => {
	const [alert, setAlert] = useState();
	useEffect(() => {
		if (!alert) return;
		const timeoutId = setTimeout(() => {
			setAlert();
		}, 2500);

		return () => clearTimeout(timeoutId);
	}, [alert]);

	useEffect(() => {
		const callback = alertData => setAlert(alertData);

		const handler = alertBox.suscribe(callback);

		return () => alertBox.unsuscribe(handler);
	});

	return alert;
};

export default AlertBox;
