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

export const send_message_to_users = ({
                                          type,
                                          bot,
                                          userToSendIds,
                                          message,
                                          botToken,
                                          form
                                      }: Omit<IPostmanData, 'error' | 'ctx' | 'chatID'>) => {
    const checkedMessage = message ?? 'Произошла ошибка при тестировании коллекции'
    const parsedUsers: string[] = parseUserToSendIds(userToSendIds)

    switch (type) {
        case 'API':
            parsedUsers.forEach((id, index) => {
                try {
                    console.log(index, 'APIAPIAPI', botToken, id, form)
                    send_message_to_chat({botToken, chatID: id, form})
                } catch (e) {
                    console.error('send_message_to_users API type', e)
                }
            })
            break;
        case 'BOT':
            parsedUsers.forEach((id, index) => {
                try {
                    console.log(index, 'APIAPIAPI', botToken, id, checkedMessage)
                    send_message_to_user({botToken, chatID: id, message: checkedMessage})
                } catch (e) {
                    console.error('send_message_to_users BOT type', e)
                }
            })
            break;
    }
}

export const newmanResponseHandler = ({error, bot, chatID, botToken, ctx, userToSendIds}: IPostmanData) => {
    ctx.telegram.deleteMessage(ctx?.session?.chatId, ctx?.session?.messageId)

    if (error) {
        const message = `Произошла ошибка при тестировании коллекции: ${error}`
        send_message_to_users({type: 'BOT', bot, userToSendIds, message, botToken})
    }

    let readStream = fs.createReadStream('report/report.html')
    let form: FormData = new FormData()
    form.append('document', readStream)
    send_message_to_users({type: 'API', bot, userToSendIds, message: '', botToken, form: form})
}
