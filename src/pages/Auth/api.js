import {axios} from '../../services'

export const postLogin = async(data) => {
    return axios.post('/user/login', data)
}

export const postRegister = async(data) => {
    return axios.post('/user/register', data)
}