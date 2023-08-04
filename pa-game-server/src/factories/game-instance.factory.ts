import { Injectable } from 'pa-game-shared/src/ioc';
import { GameInstance } from '../models';
import { v4 } from 'uuid';

@Injectable()
export class GameInstanceFactory {
	generateGameInstance() {
		const newInstance: GameInstance = {
			uuid: v4(),
			players: [],
			maxPlayers: 10,
			gameState: { status: 'idle' },
			gameLoopInfo: { dt: NaN, t: performance.now(), breakLoop: false, loopInterval: 5000 },
		};
		return newInstance;
	}
}
