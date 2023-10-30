<template>
  <el-card class="flex flex-col h-screen">
    <template #header>
      <span class="font-bold">项目配置</span>
    </template>
    <el-form inline class="flex">
      <el-form-item label="项目名称">
        <el-input v-model="projectName" placeholder="请输入项目名搜索" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
       <el-button type="primary" class="ml-[auto]" @click="onAdd">新增配置</el-button>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="projectName" label="项目名称">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="handleToDetail(scope.row)"
            style="color: #0A65CC;"
          >
            {{ scope.row.projectName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="gitUrl" label="仓库地址"></el-table-column>
      <el-table-column prop="gitBranch" label="构建分支"></el-table-column>
      <el-table-column prop="buildCommand" label="shell命令"></el-table-column>
      <el-table-column prop="uploadPath" label="上传路径"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-icon :size="20" color="#409EFF" class="mr-[10px]" @click="onEdit(scope.row)">
      			<Edit style="cursor: pointer"/>
    			</el-icon>
          <el-popconfirm title="确定删除该配置？"  @confirm="onDel(scope.row)">
    				<template #reference>
      				<el-icon :size="20" color="red" class="mr-[8px]">
      					<Delete  style="cursor: pointer"/>
    					</el-icon>
    				</template>
  				</el-popconfirm>
        	
        </template>
        
      </el-table-column>
    </el-table>

    <el-pagination
      class="mt-[16px] justify-end"
      v-model:currentPage="searchParams.pageNo"
      v-model:page-size="searchParams.pageSize"
      :page-sizes="[10,20,30]"
      layout="sizes,prev, pager, next"
      :total="searchParams.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="50%"
    align-center
  >
    <el-form :model="formData" label-width="120px">
      <el-form-item label="项目名称" props="projectName" :rules="{required: true}">
        <el-input v-model="formData.projectName" placeholder="输入项目名称"/>
      </el-form-item>
      <el-form-item label="仓库地址" props="gitUrl" :rules="{required: true}">
        <el-input v-model="formData.gitUrl" placeholder="输入仓库地址"/>
      </el-form-item>
      <el-form-item label="构建分支" props="gitBranch" :rules="{required: true}">
        <el-input v-model="formData.gitBranch" placeholder="输入构建分支"/>
      </el-form-item>
      <el-form-item label="shell 命令" props="buildCommand" :rules="{required: true}">
        <el-input v-model="formData.buildCommand" placeholder="输入shell 命令"/>
      </el-form-item>
      <el-form-item label="上传路径" props="uploadPath" :rules="{required: true}">
        <el-input v-model="formData.uploadPath" placeholder="输入上传路径"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import useConfigList from './useConfigList'

const {
  searchParams,
  tableData,
  onSearch,
  projectName,
  dialogVisible,
  dialogTitle,
  formData,
  handleSizeChange,
  handleCurrentChange,
  handleToDetail,
  onAdd,
  onSubmit,
  onEdit,
  onDel
} = useConfigList()
</script>

<script>
import {Edit,Delete} from "@element-plus/icons-vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ConfigList'
})
</script>
<style scoped>
</style>