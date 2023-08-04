import { Injectable } from 'pa-game-shared/src/ioc/injector';
import { v4 } from 'uuid';
import webSocket from 'ws';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { ContainerEventEmitter } from 'pa-game-shared/src/ioc';
import { ContainerEvent } from '../events';
import { WsClient } from '../models';

@Injectable()
export class WsConnectionProvider extends ContainerEventEmitter {
	private readonly wss: webSocket.Server;

	constructor(private readonly messageHandlerProvider: MessageHandlerProvider) {
		super();

		this.wss = new webSocket.Server({ port: 6661 });
		this.wss.on('connection', (ws) => {
			const wsClient: WsClient = { uuid: v4(), ws, messageCount: 0 };

			this.emit(ContainerEvent.OnClientConnected, wsClient);

			ws.onmessage = (e) => {
				const data = e.data;
				this.messageHandlerProvider.handleMessage(JSON.parse(data.toString()), wsClient.uuid);
			};

			ws.onclose = (e) => {
				this.emit(ContainerEvent.OnClientDisconnected, wsClient.uuid);
			};
		});
	}
}
