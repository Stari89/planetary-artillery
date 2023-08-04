import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { GameInstancesLoopProvider, WsConnectionProvider, WsMessageControllerProvider } from './providers';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { WsClientProvider } from './providers/ws-client.provider';
import { WsMessageFactory } from './factories/ws-message.factory';

@Injectable()
class ServerApp {
	constructor(
		private readonly gameInstanceLoopProvider: GameInstancesLoopProvider,
		private readonly messageHandlerProvider: MessageHandlerProvider,
		private readonly wsClientProvider: WsClientProvider,
		private readonly wsConnectionProvider: WsConnectionProvider,
		private readonly wsMessageControllerProvider: WsMessageControllerProvider,
		private readonly wsMessageFactory: WsMessageFactory
	) {}
}

Injector.instance.resolve<ServerApp>(ServerApp);
