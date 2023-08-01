import { StringGenerator } from "../utils";
import { ResolvedType } from "./resolved-type";

export class Container extends Map {
    private static _instance: Container;

    private constructor() {
        super();
    }

    public static get instance(): Container {
        if (!Container._instance) {
            Container._instance = new Container();
        }
        return this._instance;
    }

    public getClassInstance<T>(target: ResolvedType<any>, injections: Array<any>): T {
        if (target.prototype.isSingleton) {
            const classInstance = this.get(target);
            if (classInstance) {
                return classInstance;
            }
        }

        const newClassInstance = new target(...injections);
        if (target.prototype.isSingleton) {
            this.set(target, newClassInstance);
        } else {
            this.set(StringGenerator.generateRandomUniqueId(this), newClassInstance);
        }
        return newClassInstance;
    }

    public release(): void {
        for (const value of this.values()) {
            if (typeof value['onRelease'] === 'function') {
                value['onRelease']();
            }
        }

        this.clear();
    }
}

export interface OnRelease {
    onRelease(): void;
}
