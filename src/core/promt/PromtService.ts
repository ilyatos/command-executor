import inquirer from 'inquirer';
import { PromtTypes } from './types.js';

export class PromtService {
    public async input(message: string, type: 'number'): Promise<number>;
    public async input(message: string, type: 'input' | 'password'): Promise<string>;
    public async input(message: string, type: PromtTypes): Promise<number | string> {
        const {result} = await inquirer.prompt([{
               type,
               name: 'result',
               message
        }]);

        return result;
    }
}