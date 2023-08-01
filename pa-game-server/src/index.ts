import webSocket from 'ws';
import { v4 } from 'uuid';
import { WsMessage } from 'pa-game-shared/src/models';
import { handleMessage } from 'pa-game-shared/src/utils';
import { wsMessageHandlers } from './ws-message-handlers';

const wss = new webSocket.Server({ port: 6661 });
const clients = new Map();

wss.on('connection', (ws) => {
	const id = v4();
	const color = Math.floor(Math.random() * 360);
	const metadata = { id, color };
	clients.set(ws, metadata);

	ws.on('message', (data) => {
		const metadata = clients.get(ws);
		console.log(metadata);
		handleMessage(JSON.parse(data.toString()), wsMessageHandlers);
	});

	ws.on('close', () => {
		console.log('close');
		clients.delete(ws);
	});

	setInterval(() => {
		const gameState: WsMessage<'GameState'> = {
			uuid: v4(),
			messageCount: 123,
			payload: {
				state: 'idle',
				playerCount: 1,
			},
			messageType: 'GameState',
		};

		ws.send(JSON.stringify(gameState));
	}, 1000);
});
