export interface GameStatePayload {
	state: 'idle' | 'splash' | 'loading' | 'loop';
	playerCount: number;
}
