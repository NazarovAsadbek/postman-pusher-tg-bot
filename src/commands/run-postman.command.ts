import * as newman from 'newman';
import {Command} from "./comman.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {IConfigService} from "../config/config.interface";
import {get_collection, get_envirenments} from "../api/postman";
import {newmanResponseHandler, parseUserToSendIds} from "./run-postman.service";
import {NEWMAN_CONFIG} from "./run-postman.config";

export class RunPostmanCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, configService: IConfigService) {
        super(bot, configService);
    }

    async handle(): Promise<void> {
        const botToken: string = this.configService.get('BOT_TOKEN');
        const userToSendIds: string = this.configService.get('USER_TO_SEND_IDS');
        const parsedUsers: string[] = parseUserToSendIds(userToSendIds);

        for (const id of parsedUsers) {
            try {
                const env = await get_envirenments();
                const collection = await get_collection();

                newman.run(NEWMAN_CONFIG({ collection, env }), (error) => {
                    newmanResponseHandler({ error, bot: this.bot, chatID: id, botToken, userToSendIds });
                });
            } catch (error) {
                console.error(error || 'Error occurred');
            }
        }
    }
}
