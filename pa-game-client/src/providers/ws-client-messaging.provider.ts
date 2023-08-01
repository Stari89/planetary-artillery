import { Injectable } from 'pa-game-shared/src/ioc/injector';
import { WsMessage } from 'pa-game-shared/src/models';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';

@Injectable()
export class WsClientMessagingProvider {
	private readonly ws: WebSocket;

	constructor(private readonly messageHandlerProvider: MessageHandlerProvider) {
		this.ws = new WebSocket('ws://localhost:6661');
		this.ws.onmessage = (e) => {
			const payload = JSON.parse(e.data) as WsMessage<any>;
			this.messageHandlerProvider.handleMessage(payload);
		}
	}
}