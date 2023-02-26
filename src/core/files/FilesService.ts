import {dirname, join} from 'path';
import {promises as fs} from 'fs';

export class FileService {
    public getPath(path: string, name: string, ext: string): string {
        // if (isAbsolute(path)) {
        //     path = join(`${__dirname}/${path}`)
        // }

        return join(`${dirname(path)}/${name}.${ext}`)
    }

    public async delete(path: string): Promise<void> {
        if (await this.exists(path)) {
            return fs.unlink(path);
        }
    } 

    private async exists(path: string): Promise<boolean> {
        try {
            await fs.stat(path);
            return true;
        } catch {
            return false;
        }
    }
}
