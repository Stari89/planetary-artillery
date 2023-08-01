import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { WsServerMessagingProvider } from './providers';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { WsMessageHandlers } from 'pa-game-shared/src/models';

@Injectable()
class ServerApp {
	constructor(
		private readonly wsServerMessagingProvider: WsServerMessagingProvider,
		private readonly messageHandlerProvider: MessageHandlerProvider
	) {
		const wsMessageHandlers: WsMessageHandlers = {
			SignInRequest: (payload) => {
				console.log('Recieved sign in request', payload);
			},
		};
		this.messageHandlerProvider.init(wsMessageHandlers);
	}
}

Injector.instance.resolve<ServerApp>(ServerApp);
