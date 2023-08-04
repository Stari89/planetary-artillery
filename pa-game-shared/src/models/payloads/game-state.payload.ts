export interface GameStatePayload {
	instanceUuid: string;
	state: 'idle' | 'splash' | 'loading' | 'loop';
	players: string[];
}
