import { ChildProcessWithoutNullStreams } from 'child_process';
import { StreamProxy } from '../handlers/StreamProxy.js';
import { Command } from './types.js';

export abstract class CommandExecutor<Input> {
    constructor(protected readonly logger: StreamProxy) { };

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): Command;
    protected abstract spawn(command: Command): Promise<ChildProcessWithoutNullStreams>;
    protected abstract processSteam(stream: ChildProcessWithoutNullStreams): void;

    public async execute(): Promise<void> {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = await this.spawn(command);
        this.processSteam(stream);
    }
}
