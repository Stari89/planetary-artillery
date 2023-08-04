import { ContainerEventEmitter, Injectable } from 'pa-game-shared/src/ioc';
import {
	GameStatePayload,
	JoinGameResponsePayload,
	MessageTypeMap,
	WsMessage,
	WsMessageHandlers,
} from 'pa-game-shared/src/models';
import { GameInstance, Player } from '../models';
import { ContainerEvent, OnInstanceUpdate, OnPlayerJoinedGameInstance } from '../events';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { WsClientProvider } from './ws-client.provider';
import { v4 } from 'uuid';

@Injectable()
export class WsControllerProvider
	extends ContainerEventEmitter
	implements OnPlayerJoinedGameInstance, OnInstanceUpdate
{
	// Incoming WebSocket "requests"
	private readonly wsMessageHandlers: WsMessageHandlers = {
		JoinGameRequest: (payload, wsClientUuid) => {
			if (!wsClientUuid) {
				return;
			}
			const player: Player = { name: payload.username, wsClientUuid };
			this.emit(ContainerEvent.OnPlayerWantsJoinGameInstance, player);
		},
	};

	constructor(
		private readonly messageHandlerProvider: MessageHandlerProvider,
		private readonly wsClientProvider: WsClientProvider
	) {
		super();
		this.messageHandlerProvider.init(this.wsMessageHandlers);
	}

	// Outgoing WebSocket "responses"
	onPlayerJoinedGameInstance(player: Player, instance: GameInstance): void {
		const payload: JoinGameResponsePayload = {
			status: 'ok',
		};
		this.sendMessage(payload, 'JoinGameResponse', player.wsClientUuid);
	}

	onInstanceUpdate(instance: GameInstance): void {
		const payload: GameStatePayload = {
			players: instance.players.map((p) => p.name),
			state: 'idle',
			instanceUuid: instance.uuid,
		};
		instance.players.forEach((p) => {
			this.sendMessage(payload, 'GameState', p.wsClientUuid);
		});
	}

	private sendMessage<T extends keyof MessageTypeMap>(payload: MessageTypeMap[T], messageType: T, wsClientUuid: string) {
		const wsClient = this.wsClientProvider.findClient(wsClientUuid);
		wsClient.messageCount++;
		const wsMessage: WsMessage<T> = {
			uuid: v4(),
			messageCount: wsClient.messageCount,
			payload,
			messageType,
		};
		wsClient.ws.send(JSON.stringify(wsMessage));
	}
}
