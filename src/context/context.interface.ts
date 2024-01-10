import {Context} from "telegraf"

export interface ISessionData {
    status: boolean;
    messageId: number;
    chatId: number;
}

export interface IBotContext extends Context {
    session: ISessionData;
}
