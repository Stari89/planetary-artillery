import { Injectable } from 'pa-game-shared/src/ioc';
import { JoinGameResponsePayload, MessageTypeMap, WsMessage } from 'pa-game-shared/src/models';
import { v4 } from 'uuid';
import { WsClientProvider } from '../providers';
import { GameInstance, Player } from '../models';
import { OnPlayerJoinedGameInstance } from '../events';

@Injectable()
export class WsMessageFactory implements OnPlayerJoinedGameInstance {
	constructor(private readonly wsClientProvider: WsClientProvider) {}

	generateMessage<T extends keyof MessageTypeMap>(payload: MessageTypeMap[T], messageType: T, wsClientUuid: string) {
		const wsClient = this.wsClientProvider.findClient(wsClientUuid);
		wsClient.messageCount++;
		const wsMessage: WsMessage<T> = {
			uuid: v4(),
			messageCount: wsClient.messageCount,
			payload,
			messageType,
		};
		return wsMessage;
	}

	onPlayerJoinedGameInstance(player: Player, instance: GameInstance): void {
		const payload: JoinGameResponsePayload = {
			status: 'ok',
		};
		const message = this.generateMessage(payload, 'JoinGameResponse', player.wsClientUuid);
		this.wsClientProvider.findClient(player.wsClientUuid).ws.send(JSON.stringify(message));
	}
}
