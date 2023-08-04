import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { UiProvider, WsClientMessagingProvider } from './providers';
import { MessageHandlerProvider } from 'pa-game-shared/src/providers';
import { WsMessageHandlers } from 'pa-game-shared/src/models';

window.onload = () => {
	Injector.instance.resolve<ClientApp>(ClientApp);
};

@Injectable()
class ClientApp {
	constructor(
		private readonly uiProvider: UiProvider,
		private readonly wsClientMessagingProvider: WsClientMessagingProvider,
		private readonly messageHandlerProvider: MessageHandlerProvider
	) {
		const wsMessageHandlers: WsMessageHandlers = {
			GameState: (payload) => {
				console.log('Received game state', payload);
			},
			JoinGameResponse(payload) {
				console.log('Recieved sign in response', payload);
			},
		};
		this.messageHandlerProvider.init(wsMessageHandlers);
	}
}
