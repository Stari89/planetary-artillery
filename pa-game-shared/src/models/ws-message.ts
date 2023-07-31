export interface FooPayload {

}

export interface BarPayload {

}

export interface MessageTypeMap {
	Foo: FooPayload;
	Bar: BarPayload;
}

export abstract class WsMessage<T extends keyof MessageTypeMap> {
	uuid: string;
	messageCount: number;
	payload: MessageTypeMap[T];
	messageType: T;
}
