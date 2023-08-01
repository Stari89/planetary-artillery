import 'reflect-metadata';
import { ResolvedType } from './resolved-type';
import { Container } from './container';

export class Injector {
    private static _instance: Injector;

    private constructor() {}

    public static get instance(): Injector {
        if (!Injector._instance) {
            Injector._instance = new Injector();
        }
        return this._instance;
    }

    public resolve<T>(target: ResolvedType<any>): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections: Array<any> = tokens.map((token: ResolvedType<any>) => this.resolve<any>(token));
        return Container.instance.getClassInstance(target, injections);
    }
}

export const Injectable = (): ((target: ResolvedType<any>) => void) => {
    return (target: ResolvedType<any>) => {
        target.prototype.isSingleton = true;
    };
};
