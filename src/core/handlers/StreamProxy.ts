import { ChildProcessWithoutNullStreams } from 'child_process';
import { StreamLogger } from './types.js';

export class StreamProxy {
    constructor(private readonly logger: StreamLogger) { }

    public process(stream: ChildProcessWithoutNullStreams): void {
        stream.stdout.on('data', (chunk: any) => this.logger.log(chunk));
        stream.stderr.on('data', (chunk: any) => this.logger.error(chunk));
        stream.on('close', () => this.logger.end());
    }
}
