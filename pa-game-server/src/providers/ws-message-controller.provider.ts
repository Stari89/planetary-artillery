import { ContainerEventEmitter, Injectable } from "pa-game-shared/src/ioc";
import { WsMessageHandlers } from "pa-game-shared/src/models";
import { Player } from "../models";
import { ContainerEvent } from "../events";
import { MessageHandlerProvider } from "pa-game-shared/src/providers";

@Injectable()
export class WsMessageControllerProvider extends ContainerEventEmitter {
	constructor(private readonly messageHandlerProvider: MessageHandlerProvider) {
		super();

		const wsMessageHandlers: WsMessageHandlers = {
			JoinGameRequest: (payload, wsClientUuid) => {
				if (!wsClientUuid) {
					return;
				}
				const player: Player = { name: payload.username, wsClientUuid };
				this.emit(ContainerEvent.OnPlayerWantsJoinGameInstance, player);
			},
		};
		this.messageHandlerProvider.init(wsMessageHandlers);
	}
}