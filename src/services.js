import Axios from 'axios'
import router from "@/router";

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

// 请求拦截器, 每次请求都会在请求头中携带token
axios.interceptors.request.use((config) => {
    if(localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config;
  }, (error) => {
    console.info(error);
    return Promise.reject(error);
  })
  
axios.interceptors.response.use((response) => {
    const data = response.data
    return data
    
},(error) => {
    console.info(error);
    if (error.response.status === 402){
        router.replace('/user/login')
        localStorage.removeItem('Authorization')
    }
    return Promise.reject(error)
})