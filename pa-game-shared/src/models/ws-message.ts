import { GameStatePayload, SignInRequestPayload, SignInResponsePayload } from './payloads';

export interface MessageTypeMap {
	GameState: GameStatePayload;
	SignInRequest: SignInRequestPayload;
	SignInResponse: SignInResponsePayload;
}

export interface WsMessage<T extends keyof MessageTypeMap> {
	uuid: string;
	messageCount: number;
	payload: MessageTypeMap[T];
	messageType: T;
}
