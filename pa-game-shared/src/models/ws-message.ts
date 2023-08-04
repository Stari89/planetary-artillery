import { GameStatePayload, JoinGameRequestPayload, JoinGameResponsePayload } from './payloads';

export interface MessageTypeMap {
	GameState: GameStatePayload;
	JoinGameRequest: JoinGameRequestPayload;
	JoinGameResponse: JoinGameResponsePayload;
}

export interface WsMessage<T extends keyof MessageTypeMap> {
	uuid: string;
	messageCount: number;
	payload: MessageTypeMap[T];
	messageType: T;
}

export type WsMessageHandlers = {
	[K in keyof MessageTypeMap]?: (payload: MessageTypeMap[K], wsClientUuid?: string) => void;
};
