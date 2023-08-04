import { Injectable } from 'pa-game-shared/src/ioc';
import { OnClientConnected, OnClientDisconnected } from '../events/container-event';
import { WsClient } from '../models';

@Injectable()
export class WsClientProvider implements OnClientConnected, OnClientDisconnected {
	private readonly wsClients: WsClient[];

	constructor() {
		this.wsClients = [];
	}

	findClient(uuid: string) {
		const wsClient = this.wsClients.find((wsc) => wsc.uuid === uuid);
		if (!wsClient) {
			throw new Error('No wsClient with uuid ' + uuid);
		}
		return wsClient;
	}

	onClientConnected(wsClient: WsClient): void {
		this.wsClients.push(wsClient);
	}

	onClientDisconnected(uuid: string): void {
		const idx = this.wsClients.findIndex((wsc) => wsc.uuid === uuid);
		if (idx < 0) {
			return;
		}
		this.wsClients.splice(idx, 1);
	}
}
