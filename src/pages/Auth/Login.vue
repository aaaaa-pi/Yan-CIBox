<template>
  <div class="flex h-full flex-wrap justify-center content-center">
    <el-card class="bg-gray-50 w-[400px]  rounded-md">
        <h1 class="text-center text-2xl mb-5 font-bold">登录页面</h1>
        <el-form
          label-position="top"
          label-width="100px"
          :model="formData"
          :rules = "rules"
          style="max-width: 460px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="formData.username" 
              :prefix-icon="User"
              placeholder="用户名"
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
        <el-button class="w-full mb-3" type="primary" @click="doLogin">登录</el-button>
        <span>没有帐户吗？<router-link to="/user/register" class='text-blue-500'>注册</router-link></span>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import { postLogin } from './api'
import { User,Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const formData = ref({
  username:'',
  password:''
})

const doLogin = async() => {
  try {
    const res = await postLogin(formData.value)
    let token = 'Bearer ' + res.data.token;

    store.commit('user/updateUser', {
      username: res.data.username,
      userRole:'User'
    })
    store.commit('user/changeLogin', {
      Authorization: token
    })
    
    ElMessage.success('登录成功')
    router.push({
      path: "/configList",
      replace: true,
    });
  }catch(err){
    console.log(err);
    
    ElMessage.error('登录失败，请检查用户名或密码是否正确')
  }
}

const rules = reactive({
  username: [
    { required:true, message: '用户名不能为空', trigger: 'blur'}
  ],
  password: [
    { required:true, message: '密码不能为空', trigger: 'blur'},
    { min: 6, message: '长度不能少于 6 个字符', trigger: 'blur' },
  ]
})
</script>

<style scoped>
</style>