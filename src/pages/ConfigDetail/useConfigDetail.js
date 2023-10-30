import {getConfigDetail} from './api'
import { useRoute } from 'vue-router'
import {ref,onMounted,onUnmounted} from 'vue'
import {io} from 'socket.io-client'

export default function useConfigDetail() {
    let socketConnected = false
    const ioInstance = ref()
    const route = useRoute()
    const stream = ref('')
    const loading = ref(false)
    const configDetail = ref({
        projectName: '',
        gitUrl:'',
        gitBranch:'',
        buildCommand:'',
        uploadPath:''
    })
    const initData = async() => {
        try {
            const res = await getConfigDetail(route.params)
            configDetail.value = res
        }catch(e){
            console.error(e);
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
        ioInstance.value.on('build:error',(err) => {})
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
        loading
    }
}