import { useEffect, useState } from 'react';

export default ({ epoch, style }) => {
	const [ state, setState ] = useState({ day: '--', hrs: '--', mins: '--', sec: '--' });

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const currDate = Math.floor(now.getTime() / 1000);
			const remainingTime = epoch - currDate;
			const seconds = Number(remainingTime);
			const day = Math.floor(seconds / (3600 * 24));
			const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
			const mins = Math.floor((seconds % 3600) / 60);
			const sec = Math.floor(seconds % 60);
			setState({ day, hrs, mins, sec });
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span style={style}>{`${state.day} Days ${state.hrs} Hours ${state.mins} Minutes ${state.sec} Seconds`}</span>
	);
};
