import {axios} from '../../services'

export const getConfig = async(params) => {
    return axios.get('/job',{params})
}

export const postSave = async(data) => {
    return axios.post('/job/save',data)
}

export const postUpdate = async(data) => {
    return axios.post('/job/update',data)
}

export const postDelete = async(data) => {
    return axios.post('/job/delete',data)
}