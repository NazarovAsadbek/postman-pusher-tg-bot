import {Command} from "./comman.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {IConfigService} from "../config/config.interface";
import {RunPostmanCommand} from "../commands/run-postman.command";
import {send_message_to_users} from "./run-postman.service";

export class HearCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, configService: IConfigService) {
        super(bot, configService);
    }

    handle(): void {
        const commands = ["get postman report", "api status", "апи статус", "статус апи", "работает ли бэк", "работают ли api"];
        const regex = new RegExp('(' + commands.join('|') + ')', 'i');
        const userToSendIds: string = this.configService.get('USER_TO_SEND_IDS');
        const postmanCommand = new RunPostmanCommand(this.bot, this.configService)

        this.bot.hears(regex, async (ctx) => {
            const message = await ctx.reply('Botir, if you have faith, start sending those prayers!🤣🤣🤣')
            ctx.session.messageId = message.message_id;
            ctx.session.chatId = message.chat.id;
            send_message_to_users({
                type: 'BOT',
                bot: this.bot,
                userToSendIds,
                message: 'Back end tested at: ' + new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU'),
                botToken: this.configService.get('BOT_TOKEN')
            })

            postmanCommand.handle(ctx)
        })
    }
}
