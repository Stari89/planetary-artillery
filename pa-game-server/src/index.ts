import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { GameInstancesLoopProvider, WsConnectionProvider, WsControllerProvider } from './providers';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { WsClientProvider } from './providers/ws-client.provider';

@Injectable()
class ServerApp {
	constructor(
		private readonly gameInstanceLoopProvider: GameInstancesLoopProvider,
		private readonly messageHandlerProvider: MessageHandlerProvider,
		private readonly wsClientProvider: WsClientProvider,
		private readonly wsConnectionProvider: WsConnectionProvider,
		private readonly wsControllerProvider: WsControllerProvider
	) {}
}

Injector.instance.resolve<ServerApp>(ServerApp);
