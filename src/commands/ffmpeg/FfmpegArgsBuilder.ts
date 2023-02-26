import { ArgCollection } from '../../core/executor/ArgCollection.js';
import { NamedArg, PositionalArg } from '../../core/executor/types.js';

export class FfmpegArgsBuilder {
    private input: PositionalArg;
    private output: PositionalArg;

    private readonly codec: NamedArg = { name: '-c:v', value: 'libx264' };
    private size?: NamedArg;

    constructor(inputPath: string, outputPath: string) {
        this.input = { value: inputPath };
        this.output = { value: outputPath };
    }

    public setSize(width: number, height: number): this {
        this.size = { name: '-s', value: `${width}x${height}` };
        return this;
    }

    public build(): ArgCollection {
        let args: ArgCollection = new ArgCollection(this.input, this.codec);

        if (this.size) {
            args.push(this.size);
        }

        if (this.output) {
            args.push(this.output);
        }

        return args;
    }
}