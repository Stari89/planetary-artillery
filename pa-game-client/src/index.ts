import { GoodbyeWorld } from 'pa-game-shared/dist/models/ws-messages';

const goodbyeWorld: GoodbyeWorld = { goodbyeWorld: false };

window.onload = () => {
	const ws = new WebSocket('ws://localhost:6661');
	ws.onopen = (e) => {
		console.log('open', e, goodbyeWorld);
		setInterval(() => {
			ws.send('Hello, World!');
		}, 3000);
	};
};
