<template>
  <el-card class="w-full">
    <template #header>
      <span class="font-bold">{{ configDetail.projectName }} 的配置详情</span>
    </template>

    <el-form class="flex flex-wrap justify-between" :model="configDetail">
      <el-form-item class="basis-[48%]" label="项目名称" placeholder="请输入项目名称">
        <el-input v-model="configDetail.projectName"/>
      </el-form-item>
      <el-form-item class="basis-[48%]" label="仓库地址">
        <el-input v-model="configDetail.gitUrl" placeholder="请输入仓库地址"/>
      </el-form-item>
      <el-form-item class="basis-[48%]" label="构建分支">
        <el-input v-model="configDetail.gitBranch" placeholder="请输入构建分支"/>
      </el-form-item>
      <el-form-item class="basis-[48%]" label="shell 命令">
        <el-input v-model="configDetail.buildCommand" placeholder="请输入shell 命令"/>
      </el-form-item>
      <el-form-item class="basis-[48%]" label="上传路径">
        <el-input v-model="configDetail.uploadPath" placeholder="请输入上传路径"/>
      </el-form-item>
      <el-button type="primary" class="basis-[48%]" @click="updateConfig">更新配置</el-button>
    </el-form>

    <el-divider>操作区域</el-divider>
      <el-button type="primary" @click="handleBuild" :loading="loading">开始构建</el-button>
      <el-button type="danger" @click="handleStopBuild" :loading="stopLoading">停止构建</el-button>
      <el-button type="primary">构建历史</el-button>
      <el-button type="warning" style="background: #f39c12">回滚</el-button>
    <el-divider>构建日志</el-divider>
    <el-card class="box-card min-h-[320px]" v-loading="loading">
      <el-scrollbar>
        <pre>{{ stream }}</pre>
      </el-scrollbar>
    </el-card>
  </el-card>
</template>

<script setup>
import useConfigDetail from './useConfigDetail'

const {
  configDetail,
  handleBuild,
  handleStopBuild,
  stream,
  loading,
  stopLoading,
  updateConfig
} = useConfigDetail()


</script>

<style scoped>
:deep(.el-card){
  background: #efefef;
  border-radius: 4px;
  border: 1px solid #d4d4d4;
}
</style>