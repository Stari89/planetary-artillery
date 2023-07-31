window.onload = () => {
	const ws = new WebSocket('ws://localhost:6661');
	ws.onopen = (e) => {
		console.log('open', e);
		setInterval(() => {
			ws.send('Hello, World!');
		}, 3000);
	};
};
