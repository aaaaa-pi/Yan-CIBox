import {getConfigDetail,getStopBuild} from './api'
import {postUpdate} from '../ConfigList/api'
import { useRoute } from 'vue-router'
import {ref,onMounted,onUnmounted, reactive,watchEffect} from 'vue'
import { ElMessage } from 'element-plus'
import {io} from 'socket.io-client'

export default function useConfigDetail() {
    let socketConnected = false
    const ioInstance = ref()
    const route = useRoute()
    const stream = ref('')
    const loading = ref(false)
    const stopLoading = ref(false)
    const configDetail = reactive({
        id: '',
        projectName: '',
        gitUrl:'',
        gitBranch:'',
        buildCommand:'',
        uploadPath:''
    })
    const initData = async() => {
        try {
            const res = await getConfigDetail(route.params)
            Object.keys(configDetail).forEach(key => {
                configDetail[key] = res[key]
            })
            configDetail.id = route.params.id
        }catch(e){
            console.error(e);
        }
    }

    const handleStopBuild = async() => {
        try {
            stopLoading.value = true
            ElMessage({
                message: '停止构建中',
                type: 'warning',
              })
            const res = await getStopBuild()
            if(res !== 'success'){
                ElMessage({
                    message: '还未获取到构建序号,请稍后重试',
                    type: 'error',
                })
            }else {
                ElMessage({
                    message: '停止构建成功',
                    type: 'success',
                })
            }
            stopLoading.value = false
        }catch(e) {
            console.error(e)
            stopLoading.value = false
        }
    }

    const initSocket = () => {
        const {id} = route.params
        ioInstance.value = io({
            path: '/jenkins/build',
            query:{
                id
            }
        })

        initLogStream()

        socketConnected = true
    }

    const initLogStream = () => {
        // 初始化成功后，可以通过 on('xxx') 接收后端 emit 的事件、数据
        ioInstance.value.on('build:data', (data) => {
            stream.value = data
        })
        ioInstance.value.on('build:error',(err) => {
            loading.value = false
            err = JSON.stringify(err)
            stream.value = `构建错误：${err}`
        })
        ioInstance.value.on('build:end',() => {
            loading.value = false
        })
    }

    const handleBuild = () => {
        loading.value = true
        if(socketConnected) {
            ioInstance.value.emit('build:start')
        }else {
            initSocket()
        }
    }

    const updateConfig = async() => {
        try {
            await postUpdate(configDetail)
            
            ElMessage.success('配置更新成功')
        }catch (err) {
            ElMessage.error('配置更新失败')
        }
    }

    onMounted(async() => {
        await initData()

        initSocket()
    })

    onUnmounted(() => {
        socketConnected = false 
        
        // 断开 WebSocket 连接
        ioInstance.value.disconnect()
      })

    return {
        configDetail,
        handleBuild,
        stream,
        loading,
        handleStopBuild,
        stopLoading,
        updateConfig
    }
}