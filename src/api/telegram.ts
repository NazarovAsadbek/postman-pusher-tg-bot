import axios from "axios";
import {IPostmanData} from "../commands/run-postman.types";

export const send_message_to_chat = ({botToken, chatID, form}: Omit<IPostmanData, 'error' | 'bot' | 'ctx' | 'userToSendIds'>) => {
    const url = `https://api.telegram.org/bot${botToken}/sendDocument?chat_id=${chatID}&disable_notification=true`
    const params = {
        headers: {
            'X-API-Key': 'PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f',
            "Content-Type": "multipart/form-data"
        }
    }

    return axios.post(url, form, params)
}

export const send_message_to_user = ({botToken, chatID, message}: Omit<IPostmanData, 'error' | 'bot' | 'ctx' | 'userToSendIds'>) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?disable_notification=true`
    const params = {
        headers: {
            'X-API-Key': 'PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f'
        }
    }

    const formData = {
        chat_id: chatID,
        text: message,
        disable_notification: true
    }

    return axios.post(url, formData, params)
}
