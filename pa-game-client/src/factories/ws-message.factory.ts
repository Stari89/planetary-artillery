import { Injectable } from 'pa-game-shared/src/ioc/injector';
import { MessageTypeMap, WsMessage } from 'pa-game-shared/src/models';
import { v4 } from 'uuid';

@Injectable()
export class WsMessageFactory {
	private messageCount: number;
	constructor() {
		this.messageCount = 0;
	}

	generateMessage<T extends keyof MessageTypeMap>(payload: MessageTypeMap[T], messageType: T) {
		const wsMessage: WsMessage<T> = {
			uuid: v4(),
			messageCount: this.messageCount,
			payload,
			messageType,
		};
		this.messageCount++;
		return wsMessage;
	}
}
