import Axios from 'axios'

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

let token = ''
axios.defaults.headers.common['token'] = token

axios.interceptors.response.use((response) => {
    const data = response.data
    if (data.code === 0){
        return data.data
    }
    data.message = data.message || data.msg
    console.log(data);
    return Promise.reject(data)
})