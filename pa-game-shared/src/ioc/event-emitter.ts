import { Container } from './container';

class EventDelegator {
	private static _instance: EventDelegator;

	private constructor() {
		this.emit = this.emit.bind(this);
	}

	public static get instance(): EventDelegator {
		if (!EventDelegator._instance) {
			EventDelegator._instance = new EventDelegator();
		}
		return this._instance;
	}

	public get emitCallback() {
		return this.emit;
	}

	private emit(event: string, ...params: any): void {
		for (const value of Container.instance.values()) {
			if (typeof value[event] === 'function') {
				value[event](...params);
			}
		}
	}
}

export class ContainerEventEmitter {
	public emit: (event: string, ...args: any) => void;

	constructor() {
		this.emit = EventDelegator.instance.emitCallback;
	}
}
