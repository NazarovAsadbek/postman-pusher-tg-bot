import {IBotContext} from "../context/context.interface";
import {Telegraf} from "telegraf";
import FormData from "form-data";

export interface IPostmanData {
    error: Error | null
    bot: Telegraf<IBotContext>
    chatID: string
    botToken: string
    ctx: IBotContext
    form?: FormData
    userToSendIds?: string
    message?: string
    type?: 'API' | 'BOT'
}
