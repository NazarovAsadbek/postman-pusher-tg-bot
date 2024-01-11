import fs from "fs";
import FormData from "form-data";
import {send_message_to_chat, send_message_to_user} from "../api/telegram";
import {IPostmanData} from "./run-postman.types";

export const parseUserToSendIds = (userToSendIds: string | undefined): string[] => {
    if (userToSendIds === undefined) {
        return []
    }
    return userToSendIds.split(',').map((id) => id.trim())
}

export const send_message_to_users = async ({type, message, botToken, form, chatID}: Omit<IPostmanData, 'error' | 'ctx'>) => {
    const checkedMessage = message ?? 'Произошла ошибка при тестировании коллекции'

    switch (type) {
        case 'API':
            try {
                await send_message_to_chat({botToken, chatID, form})
            } catch (e) {
                console.error('send_message_to_users API type', e)
            }
            break;
        case 'BOT':
            try {
                await send_message_to_user({botToken, chatID, message: checkedMessage})
            } catch (e) {
                console.error('send_message_to_users BOT type', e)
            }
            break;
    }
}

export const newmanResponseHandler = async ({error, bot, chatID, botToken}: Omit<IPostmanData, 'ctx'>) => {
    if (error) {
        const message = `Произошла ошибка при тестировании коллекции: ${error}`
        await send_message_to_users({type: 'BOT', bot, message, botToken, chatID})
    }

    let readStream = fs.createReadStream('report/report.html')
    let form: FormData = new FormData()
    form.append('document', readStream)
    await send_message_to_users({type: 'API', bot, botToken, form, chatID})
}
