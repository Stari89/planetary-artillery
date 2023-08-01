import { Injectable } from 'pa-game-shared/src/ioc/injector';
import { WsMessage } from 'pa-game-shared/src/models';
import { handleMessage } from 'pa-game-shared/src/utils';
import { wsMessageHandlers } from '../ws-message-handlers';

@Injectable()
export class WsMessagingProvider {
	private readonly ws: WebSocket;

	constructor() {
		this.ws = new WebSocket('ws://localhost:6661');
		this.ws.onmessage = (e) => {
			const payload = JSON.parse(e.data) as WsMessage<any>;
			handleMessage(payload, wsMessageHandlers);
		}
	}
}