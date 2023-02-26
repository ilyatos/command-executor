import { spawn } from 'child_process';
import inquirer from 'inquirer';

(async function convert(): Promise<void> {
    const {width, height, path, name} = await inquirer.prompt([
        {
            type: 'number',
            name: 'width',
            message: 'Ширина'
        },
        {
            type: 'number',
            name: 'height',
            message: 'Высота'
        },
        {
            type: 'input',
            name: 'path',
            message: 'Путь'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Название'
        }
    ]);

    console.log(typeof width, typeof path);

    const res = spawn('ffmpeg', [
        '-i', path,
        '-c:v', 'libx264',
        's', `${width}x${height}`,
        path + name + '.mp4'
    ]);

    res.stdout.on('data', (data: any) => {
        console.log(data.toString());
    });

    res.stderr.on('data', (data: any) => {
        console.log(data.toString());
    });

    res.on('close', () => {
        console.log('Готово');
    });
})()