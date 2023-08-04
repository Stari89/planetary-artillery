import ws from "ws";

export interface Player {
	name: string;
	wsClientUuid: string;
}

export interface WsClient {
	uuid: string;
	ws: ws;
	messageCount: number;
}

export interface GameState {
	status: 'idle' | 'running';
}
export interface GameLoopInfo {
	dt: number; // milliseconds from prevous loop
	t: number; // total milliseconds
	loopInterval: number // milliseconds;
	breakLoop: boolean;
}

export interface GameInstance {
	uuid: string;
	players: Player[];
	maxPlayers: number;
	gameState: GameState;
	gameLoopInfo: GameLoopInfo;
}