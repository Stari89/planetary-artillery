import { GameInstance, Player, WsClient } from '../models';

export enum ContainerEvent {
	OnClientConnected = 'onClientConnected',
	OnClientDisconnected = 'onClientDisconnected',
	OnInstanceRun = 'onInstanceRun',
	OnInstanceUpdate = 'onInstanceUpdate',
	OnPlayerWantsJoinGameInstance = 'onPlayerWantsJoinGameInstance',
	OnPlayerJoinedGameInstance = 'onPlayerJoinedGameInstance',
	OnPlayerLeftGameInstance = 'onPlayerLeaveGameInstance',
}

export interface OnClientConnected {
	onClientConnected(wsClient: WsClient): void;
}

export interface OnClientDisconnected {
	onClientDisconnected(uuid: string): void;
}

export interface OnInstanceRun {
	onInstanceRun(instance: GameInstance): void;
}

export interface OnInstanceUpdate {
	onInstanceUpdate(instance: GameInstance): void;
}

export interface OnPlayerWantsJoinGameInstance {
	onPlayerWantsJoinGameInstance(player: Player): void;
}

export interface OnPlayerJoinedGameInstance {
	onPlayerJoinedGameInstance(player: Player, instance: GameInstance): void;
}

export interface OnPlayerLeftGameInstance {
	onPlayerLeftGameInstance(player: Player, instance: GameInstance): void;
}

