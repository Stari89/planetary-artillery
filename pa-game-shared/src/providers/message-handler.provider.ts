import { Injectable } from '../ioc/injector';
import { MessageTypeMap, WsMessage, WsMessageHandlers } from '../models';

@Injectable()
export class MessageHandlerProvider {
	private messageHandlers?: WsMessageHandlers;

	public init(messageHandlers: WsMessageHandlers) {
		this.messageHandlers = messageHandlers;
	}

	public handleMessage<T extends keyof MessageTypeMap>(message: WsMessage<T>, wsClientUuid?: string) {
		if (!this.messageHandlers) {
			throw new Error('Message handlers not set!');
		}
		const handler = this.messageHandlers[message.messageType];
		if (handler) {
			handler(message.payload, wsClientUuid);
		} else {
			throw new Error('No handler for message type ' + message.messageType);
		}
	}
}
