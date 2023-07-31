import { MessageTypeMap, WsMessage } from "../models";

const messageHandlers: {
	[K in keyof MessageTypeMap]: (payload: MessageTypeMap[K]) => void;
} = {
	Foo: (payload) => {

	},
	Bar: (payload) => {

	}
}

const handleMessage = <T extends keyof MessageTypeMap>(message: WsMessage<T>) => {
	const handler = messageHandlers[message.messageType];
	if (handler) {
		handler(message.payload);
	} else {
		// handle shiettt
	}
}