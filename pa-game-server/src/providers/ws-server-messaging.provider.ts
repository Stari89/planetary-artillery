import { Injectable } from 'pa-game-shared/src/ioc/injector';
import { v4 } from 'uuid';
import webSocket from 'ws';
import { WsMessage } from 'pa-game-shared/src/models';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';

@Injectable()
export class WsServerMessagingProvider {
	private readonly clients: Map<any, any>;
	private readonly wss: webSocket.Server;

	constructor(private readonly messageHandlerProvider: MessageHandlerProvider) {
		this.clients = new Map();
		this.wss = new webSocket.Server({ port: 6661 });
		this.wss.on('connection', (ws) => {
			const metadata = { id: v4() };
			this.clients.set(ws, metadata);

			ws.onmessage = (e) => {
				const data = e.data;
				const metadata = this.clients.get(ws);
				this.messageHandlerProvider.handleMessage(JSON.parse(data.toString()));
			};

			ws.onclose = (e) => {
				this.clients.delete(ws);
			};

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
	}
}
