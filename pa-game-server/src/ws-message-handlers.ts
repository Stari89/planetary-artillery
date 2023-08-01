import { WsMessageHandlers } from 'pa-game-shared/src/utils';

export const wsMessageHandlers: WsMessageHandlers = {
	SignInRequest: (payload) => {
		console.log('Recieved sign in request', payload);
	},
};
