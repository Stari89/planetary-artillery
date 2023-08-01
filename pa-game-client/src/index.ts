import { WsMessage } from 'pa-game-shared/src/models';
import { handleMessage } from 'pa-game-shared/src/utils';
import { wsMessageHandlers } from './ws-message-handlers';
import { v4 } from 'uuid';

window.onload = () => {
	const signInButton = document.createElement('button');
	signInButton.innerHTML = 'SIGN IN';
	signInButton.onclick = () => {
		const signInRequest: WsMessage<'SignInRequest'> = {
			uuid: v4(),
			messageCount: 321,
			payload: {
				username: 'admin',
			},
			messageType: 'SignInRequest',
		};
		ws.send(JSON.stringify(signInRequest));
	};
	document.body.appendChild(signInButton);

	const ws = new WebSocket('ws://localhost:6661');
	ws.onopen = (e) => {
		console.log('open', e);
	};

	ws.onmessage = (e) => {
		const payload = JSON.parse(e.data) as WsMessage<any>;
		handleMessage(payload, wsMessageHandlers);
	};
};
