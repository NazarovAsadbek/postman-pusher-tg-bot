import axios from "axios";
import {IPostmanData} from "../commands/run-postman.types";
import {message} from "telegraf/filters";

export const send_message_to_chat = ({botToken, chatID, form}: Omit<IPostmanData, 'error' | 'bot' | 'ctx' | 'userToSendIds'>) => {
    const url = `https://api.telegram.org/bot${botToken}/sendDocument?chat_id=${chatID}`
    const params = {
        headers: {
            'X-API-Key': 'PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f'
        }
    }

    return axios.post(url, form, params)
}

export const send_message_to_user = ({botToken, chatID, message}: Omit<IPostmanData, 'error' | 'bot' | 'ctx' | 'userToSendIds'>) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    const params = {
        headers: {
            'X-API-Key': 'PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f'
        }
    }

    const formData = {
        chat_id: chatID,
        text: message
    }

    return axios.post(url, formData, params)
}
