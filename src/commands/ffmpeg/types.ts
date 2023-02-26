import { Command } from '../../core/executor/types.js';

export interface FfmpegInput {
    width: number;
    height: number;
    path: string;
    name: string;
}

export interface FfmpegCommand extends Command {
    output: string;
}