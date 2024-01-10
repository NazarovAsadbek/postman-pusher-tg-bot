import axios from "axios";

export const get_envirenments = () => {
    const url = "https://api.postman.com/environments/486b9644-cb60-47ec-aebc-ef08819a163d?access_key=PMAT-01HKQ3FJM7XSH75HBMZFHS82KM"
    const params = {
        headers: {
            'X-API-Key': 'PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f'
        }
    }

    return axios.get(url, params)
}


export const get_collection = () => {
    const url = "https://api.postman.com/collections/32049231-c9205bdc-27c9-438c-b44f-6f58e811ec7d?access_key=PMAT-01HKQ3FJM7XSH75HBMZFHS82KM"
    const params = {
        headers: {
            'X-API-Key': 'PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f'
        }
    }

    return axios.get(url, params)
}
