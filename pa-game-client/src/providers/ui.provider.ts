import { Injectable } from 'pa-game-shared/src/ioc/injector';
import { WsClientMessagingProvider } from './ws-client-messaging.provider';
import { JoinGameRequestPayload, WsMessage } from 'pa-game-shared/src/models';
import { WsMessageFactory } from '../factories';

@Injectable()
export class UiProvider {
	private readonly nameInput: HTMLInputElement;
	private readonly joinGameButton: HTMLButtonElement;

	constructor(
		private readonly wsClientMessagingProvider: WsClientMessagingProvider,
		private readonly wsMessageFactory: WsMessageFactory
	) {
		this.handleJoinGameClick = this.handleJoinGameClick.bind(this);

		this.nameInput = document.createElement('input');
		document.body.appendChild(this.nameInput);

		this.joinGameButton = document.createElement('button');
		this.joinGameButton.innerHTML = 'Join Game';
		this.joinGameButton.onclick = this.handleJoinGameClick;
		document.body.appendChild(this.joinGameButton);
	}

	private handleJoinGameClick() {
		const payload: JoinGameRequestPayload = {
			username: this.nameInput.value,
		};
		const joinGameMessage = this.wsMessageFactory.generateMessage(payload, 'JoinGameRequest');

		this.wsClientMessagingProvider.sendMessage(joinGameMessage);
	}
}
