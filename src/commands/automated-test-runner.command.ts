import {Telegraf} from "telegraf";
import * as schedule from "node-schedule";
import {Command} from "./comman.class";
import {IBotContext} from "../context/context.interface";
import {IConfigService} from "../config/config.interface";
import {RunPostmanCommand} from "../commands/run-postman.command";
import {parseUserToSendIds, send_message_to_users} from "./run-postman.service";

export class AutomatedTestRunnerCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, configService: IConfigService) {
        super(bot, configService);
    }

    async handle(): Promise<void> {
        const that = this;
        const userToSendIds: string = this.configService.get('USER_TO_SEND_IDS');
        const postmanCommand = new RunPostmanCommand(this.bot, this.configService)
        const parsedUsers: string[] = parseUserToSendIds(userToSendIds)
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 12;
        rule.minute = 0;
        schedule.scheduleJob(rule, async function () {

            try {
                for (const id of parsedUsers) {
                    await send_message_to_users({
                        type: 'BOT',
                        bot: that.bot,
                        userToSendIds,
                        chatID: id,
                        message: 'Back end tested at: ' + new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU'),
                        botToken: that.configService.get('BOT_TOKEN')
                    })
                }

                await postmanCommand.handle()
            } catch (e) {
                console.error(e)
            }


        });
    }
}
