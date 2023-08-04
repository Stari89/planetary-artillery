import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { GameInstancesLoopProvider, WsConnectionProvider } from './providers';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { WsMessageHandlers } from 'pa-game-shared/src/models';
import { WsClientProvider } from './providers/ws-client.provider';
import { Player } from './models';
import { ContainerEventEmitter } from 'pa-game-shared/src/ioc';
import { ContainerEvent } from './events';
import { WsMessageFactory } from './factories/ws-message.factory';

@Injectable()
class ServerApp extends ContainerEventEmitter {
	constructor(
		private readonly gameInstanceLoopProvider: GameInstancesLoopProvider,
		private readonly messageHandlerProvider: MessageHandlerProvider,
		private readonly wsClientProvider: WsClientProvider,
		private readonly wsConnectionProvider: WsConnectionProvider,
		private readonly wsMessageFactory: WsMessageFactory
	) {
		super();
		const wsMessageHandlers: WsMessageHandlers = {
			JoinGameRequest: (payload, wsClientUuid) => {
				if (!wsClientUuid) {
					return;
				}
				const player: Player = { name: payload.username, wsClientUuid };
				this.emit(ContainerEvent.OnPlayerWantsJoinGameInstance, player);
			},
		};
		this.messageHandlerProvider.init(wsMessageHandlers);
		// this.gameInstanceLoopProvider.createInstance();
	}
}

Injector.instance.resolve<ServerApp>(ServerApp);
