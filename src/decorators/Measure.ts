
import { BenchmarkDriver } from '../BenchmarkDriver';

export function Measure() {
    return (target: BenchmarkDriver, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log('Function: ', target.constructor.name, target, propertyKey, descriptor);
    };
}