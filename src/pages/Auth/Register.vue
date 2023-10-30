<template>
  <div class="flex h-full flex-wrap justify-center content-center">
    <el-card class="bg-gray-50 w-[400px]  rounded-md">
        <h1 class="text-center text-2xl mb-5 font-bold">创建您的账户</h1>
        <el-form
          label-position="top"
          label-width="100px"
          :model="formData"
          :rules="rules"
          style="max-width: 460px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="formData.username" 
              :prefix-icon="User"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input 
              v-model="formData.email" 
              :prefix-icon="Message"
              placeholder="电子邮箱"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="formData.password"
              type="password"
              :prefix-icon="Lock"
              placeholder="密码"
              show-password
            />
          </el-form-item>
        </el-form>
        <el-button class="w-full mb-3" type="primary" @click="doRegister">创建账号</el-button>
        <span>已经有一个账号了吗？<router-link to="/user/login" class='text-blue-500'>登录</router-link></span>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import { User,Lock,Message } from '@element-plus/icons-vue'
import { postRegister } from './api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter()
const formData = ref({
  username:'',
  email:'',
  password:''
})

const doRegister = async() => {
  try {
    await postRegister(formData.value)
    ElMessage.success('注册成功')
    router.push({
      path: "/user/login",
      replace: true,
    });
  }catch(err){
    ElMessage.error('注册失败: ' + err.response.data)
  }
}

const rules = reactive({
  username: [
    { required:true, message: '用户名不能为空', trigger: 'blur'}
  ],
  email: [
    { required:true, message: '邮箱不能为空', trigger: 'blur'},
    { type: 'email', message: '请输入正确的邮箱格式',trigger: ['blur', 'change'],}
  ],
  password: [
    { required:true, message: '密码不能为空', trigger: 'blur'},
    { min: 6, message: '长度不能少于 6 个字符', trigger: 'blur' },
  ]
})
</script>

<style scoped>
</style>