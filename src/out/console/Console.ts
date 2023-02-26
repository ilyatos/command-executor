import { StreamLogger } from '../../core/handlers/types.js';

export class Console implements StreamLogger {
    public log(...args: any[]): void {
        console.log(args.toString());
    }

    public error(...args: any[]): void {
        console.log(args.toString());
    }

    public end(): void {
        console.log('Done');
    }
}