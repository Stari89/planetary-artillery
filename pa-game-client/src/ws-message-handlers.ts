import { WsMessageHandlers } from 'pa-game-shared/src/utils';

export const wsMessageHandlers: WsMessageHandlers = {
	GameState: (payload) => {
		console.log('Received game state', payload);
	},
	SignInResponse(payload) {
		console.log('Recieved sign in response', payload);
	},
};
