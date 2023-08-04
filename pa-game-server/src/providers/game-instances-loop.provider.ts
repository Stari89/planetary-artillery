import { ContainerEventEmitter, Injectable } from 'pa-game-shared/src/ioc';
import { ContainerEvent, OnPlayerWantsJoinGameInstance } from '../events';
import { GameInstance, Player } from '../models';
import { GameInstanceFactory } from '../factories';

@Injectable()
export class GameInstancesLoopProvider extends ContainerEventEmitter implements OnPlayerWantsJoinGameInstance {
	private readonly instances: GameInstance[] = [];

	constructor(private readonly gameInstanceFactory: GameInstanceFactory) {
		super();
		this.loop = this.loop.bind(this);
	}

	public createInstance() {
		const newInstance = this.gameInstanceFactory.generateGameInstance();
		this.instances.push(newInstance);
		this.emit(ContainerEvent.OnInstanceRun, newInstance);
		this.loop(newInstance.uuid);
	}

	public destroyInstance(uuid: string) {
		const instanceToDestroyIdx = this.instances.findIndex((gi) => gi.uuid === uuid);
		if (instanceToDestroyIdx < 0) {
			return;
		}
		this.instances.splice(instanceToDestroyIdx, 1);
	}

	public getInstance(uuid: string) {
		const instance = this.instances.find((gi) => gi.uuid === uuid);
		if (!instance) {
			throw new Error('No instance with uuid ' + uuid);
		}
		return instance;
	}

	private joinPlayer(player: Player) {
		let joinedExistingInstance = false;
		this.instances.forEach((i) => {
			if (!joinedExistingInstance && i.players.length < i.maxPlayers) {
				i.players.push(player);
				joinedExistingInstance = true;
				this.emit(ContainerEvent.OnPlayerJoinedGameInstance, player, i);
			}
		});
		if (joinedExistingInstance) {
			return;
		}
		this.createInstance();
		this.joinPlayer(player);
	}

	private loop(uuid: string) {
		const t = performance.now();
		const instance = this.getInstance(uuid);
		if (instance.gameLoopInfo.breakLoop) {
			return;
		}
		instance.gameLoopInfo.dt = t - instance.gameLoopInfo.t;
		instance.gameLoopInfo.t = t;

		this.emit(ContainerEvent.OnInstanceUpdate, instance);
		setTimeout(() => this.loop(instance.uuid), instance.gameLoopInfo.loopInterval);
	}

	public onPlayerWantsJoinGameInstance(player: Player): void {
		this.joinPlayer(player);
	}
}
