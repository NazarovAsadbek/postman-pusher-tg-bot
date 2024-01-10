import {Command} from "./comman.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {IConfigService} from "../config/config.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, configService: IConfigService) {
        super(bot, configService);
    }

    handle(): void {
        this.bot.start((ctx) => {
            ctx.reply('🤖 Привествую лучшую команду AX! 🚀 \n Я ваш помощник для тестирования API коллекции проекта ABC, в Telegram. \n 🔧 Как пользоваться? \n Для запуска теста, напишите команду в чате: " get postman report " \n Есть вопросы или нужна помощь? \n Напишите мне в Telegram: @NazarovAsadbekAX \n Хорошего дня! 🤗 ')
        })
    }
}
