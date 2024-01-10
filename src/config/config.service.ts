import {config, DotenvParseOutput} from "dotenv"
import {IConfigService} from "./config.interface";

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor() {
        const {error, parsed} = config();

        if (error) {
            throw new Error('ConfigService: Error parsing .env file')
        }

        if (!parsed) {
            throw new Error('ConfigService: Error parsing .env file')
        }

        this.config = parsed;
    }

    get(key: string): string {
        const res: string = this.config[key];

        if (!res) {
            throw new Error(`ConfigService: Key ${key} not found`)
        }

        return res;
    }
}
