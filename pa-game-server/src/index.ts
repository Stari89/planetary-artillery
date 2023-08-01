import { Injector, Injectable } from 'pa-game-shared/src/ioc/injector';
import { WebsocketProvider } from '../providers';

@Injectable()
class ServerApp {
	constructor(private readonly websocketProvider: WebsocketProvider) {}
}

Injector.instance.resolve<ServerApp>(ServerApp);
