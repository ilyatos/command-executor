import { FfmpegExecutor } from './commands/ffmpeg/FfmpegExecutor.js';
import { FileService } from './core/files/FilesService.js';
import { StreamProxy } from './core/handlers/StreamProxy.js';
import { PromtService } from './core/promt/PromtService.js';
import { Console } from './out/console/Console.js';

class App {
    public async run(): Promise<void> {
        const executor = new FfmpegExecutor(
            new StreamProxy(new Console()),
            new PromtService(),
            new FileService()
        );

        return executor.execute();
    }
}

const app = new App();
await app.run();
