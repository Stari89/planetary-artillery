import webSocket from 'ws';
import { uuid } from 'uuidv4';
import { GoodbyeWorld } from 'pa-game-shared/dist/models/ws-messages';

const wss = new webSocket.Server({ port: 6661 });
const clients = new Map();

wss.on('connection', (ws) => {
	const id = uuid();
	const color = Math.floor(Math.random() * 360);
	const metadata = { id, color };
	clients.set(ws, metadata);

	ws.on('message', (data) => {
		const z: GoodbyeWorld = { goodbyeWorld: true }
		const metadata = clients.get(ws);
		console.log(metadata, data.toString());
	});

	ws.on('close', () => {
		console.log('close');
		clients.delete(ws);
	});
});
