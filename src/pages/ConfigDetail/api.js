import {axios} from '../../services'

export const getConfigDetail = async(params) => {
    return axios.get('/jobDetail',{params})
}

export const getStopBuild = async() => {
    return axios.get('/stopBuild')
}