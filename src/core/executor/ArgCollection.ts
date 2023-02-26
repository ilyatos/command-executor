import { Arg, Args } from './types.js';

export class ArgCollection extends Array<Arg> implements Args {
    public toFlatArray(): string[] {
        return this.map<string[]>((arg: Arg) => {
            let argAsArray: string[] = [];

            if ("name" in arg) {
                argAsArray.push(arg.name);
            }

            if ("value" in arg) {
                argAsArray.push(arg.value);
            }

            return argAsArray;
        }).flat()
    }
}