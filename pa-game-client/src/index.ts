import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { WsMessagingProvider } from './providers';

window.onload = () => {
	Injector.instance.resolve<ClientApp>(ClientApp);
};

@Injectable()
class ClientApp {
	constructor(private readonly wsMessagingProvider: WsMessagingProvider) {}
}
