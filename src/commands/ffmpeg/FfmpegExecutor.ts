import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/CommandExecutor.js';
import { PromtService } from '../../core/promt/PromtService.js'
import { StreamProxy } from '../../core/handlers/StreamProxy.js';
import { FfmpegArgsBuilder } from './FfmpegArgsBuilder.js';
import { FileService } from '../../core/files/FilesService.js';
import { FfmpegCommand, FfmpegInput } from './types.js';

export class FfmpegExecutor extends CommandExecutor<FfmpegInput> {
    constructor(
        logger: StreamProxy,
        private readonly promtService: PromtService,
        private readonly fileService: FileService
    ) {
        super(logger);
    }

    protected async prompt(): Promise<FfmpegInput> {
        const width = await this.promtService.input("Width", "number");
        const height = await this.promtService.input("Height", "number");
        const path = await this.promtService.input("File path", "input");
        const name = await this.promtService.input("Output name", "input");

        return { width, height, path, name };
    }

    protected build(input: FfmpegInput): FfmpegCommand {
        const output = this.fileService.getPath(input.path, input.name, 'mp4');

        const args = new FfmpegArgsBuilder(input.path, output).setSize(input.width, input.height).build();

        return {
            name: "ffmpeg",
            args,
            output
        }
    }

    protected async spawn(command: FfmpegCommand): Promise<ChildProcessWithoutNullStreams> {
        await this.fileService.delete(command.output);
        return spawn(command.name, command.args.toFlatArray());
    }

    protected processSteam(stream: ChildProcessWithoutNullStreams): void {
        this.logger.process(stream);
    }
}

