import { MessageTypeMap, WsMessage } from '../models';

export type WsMessageHandlers = {
	[K in keyof MessageTypeMap]?: (payload: MessageTypeMap[K]) => void;
};

export const handleMessage = <T extends keyof MessageTypeMap>(message: WsMessage<T>, messageHandlers: WsMessageHandlers) => {
	const handler = messageHandlers[message.messageType];
	if (handler) {
		handler(message.payload);
	} else {
		// handle shiettt
	}
};
