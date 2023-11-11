import {getConfig,postSave,postUpdate,postDelete} from './api'
import {ref,reactive,onMounted,watchEffect,computed} from 'vue'
import { useRouter } from 'vue-router';
import {ElMessage} from 'element-plus';

export default function useConfigList(){
    const router = useRouter()
    const searchParams = reactive({
        pageNo:1,
        pageSize:10,
        projectName:'',
        total:0
    })
    const formData = reactive({
        projectName:'',
        gitUrl:'',
        gitBranch:'',
        buildCommand:'',
        uploadPath:''
    })
    const projectName = ref()
    const tableData = ref([])
    const isEdit = ref(false)
    const dialogTitle = computed(() => isEdit.value ? '更新配置' : '保存配置') 
    const initData = async() => {
        const res = await getConfig(searchParams)
        searchParams.total = res.data.total
        tableData.value = res.data.list
    } 
    const dialogVisible = ref(false)

    const onAdd = () => {
        Object.keys(formData).forEach(key => {
            formData[key] = ''
        })
        isEdit.value = false
        dialogVisible.value = true
    }
    const onSubmit = async() => {
        try {
            isEdit.value ? await postUpdate(formData) : await postSave(formData)
            
            isEdit.value ? ElMessage.success('配置更新成功') : ElMessage.success('配置保存成功')
            await initData()
            dialogVisible.value = false
        }catch (err) {
            isEdit.value ? ElMessage.error('配置更新失败') : ElMessage.error('配置保存失败')
        }
    }
    const onEdit = rowData => {
        isEdit.value = true
        dialogVisible.value = true
        Object.keys(formData).forEach(key => {
            formData[key] = rowData[key]
        })
        formData.id = rowData._id
    }

    const onDel = async (rowData) => {
        try {
            await postDelete({id: rowData._id})
            ElMessage.success('删除配置成功')
            await initData()
        }catch(err) {
            ElMessage.error('删除配置失败')
        }
    }
    const handleSizeChange = () => {}
    const handleCurrentChange = () => {} 
    const onSearch = () => {
        searchParams.projectName = projectName.value
    }
    const handleToDetail = (row) => {
        // router.push({path:`/configDetail/${row._id}`})
        router.push({
            name: "configDetail",
            params:{
                id: row._id
            }
        })
    }

    watchEffect(() => {
        initData()
    })
    onMounted(() => {
        initData()
    })

    return {
        searchParams,
        tableData,
        formData,
        dialogVisible,
        dialogTitle,
        onSearch,
        handleSizeChange,
        handleCurrentChange,
        handleToDetail,
        projectName,
        onAdd,
        onSubmit,
        onEdit,
        onDel
    }
}