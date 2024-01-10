import * as newman from 'newman';
import {Command} from "./comman.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {IConfigService} from "../config/config.interface";
import {get_collection, get_envirenments} from "../api/postman";
import {newmanResponseHandler} from "./run-postman.service";
import {NEWMAN_CONFIG} from "./run-postman.config";

export class RunPostmanCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, configService: IConfigService) {
        super(bot, configService);
    }

    handle(ctx: IBotContext): void {
        const that = this;
        const botToken: string = this.configService.get('BOT_TOKEN');
        const chatID: string = this.configService.get('CHAT_ID');
        const userToSendIds: string = this.configService.get('USER_TO_SEND_IDS');

        get_envirenments()
            .then((env) => {

                get_collection()
                    .then((collection) => {
                        newman.run(NEWMAN_CONFIG({collection, env}), (error) => {
                            newmanResponseHandler({error, bot: that.bot, chatID, botToken, ctx, userToSendIds})
                        });
                    })
                    .catch(() => {
                        throw new Error('Error get collection')
                    })

            })
            .catch(() => {
                throw new Error('Error get collection or envirenments')
            })
    }
}
