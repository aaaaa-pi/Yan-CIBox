<template>
  <div id="BasicLayout">
    <el-container>
      <el-aside style="width: 200px">
        <el-menu
            active-text-color="#0A65CC"
            background-color="#1f2937"
            :default-active="selectedKeys"
            class="h-screen"
            text-color="#fff"
      >
      <div class="sidebar-logo-container">
        <a href="/configList" class="sidebar-logo-link">
            <img src="@/assets/logo.png" height="60" width="60" class="logo">
            <span class="sidebar-title">Yan-CIBox</span>
        </a>
      </div>
        <el-menu-item v-for="item in visibleRoutes" :index="item.path" @click="doMenuClick">
            <el-icon><Setting /></el-icon>
            <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main class="h-screen">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {
  Setting
} from '@element-plus/icons-vue';
import { routes } from '../router/routes';
import { useRouter } from 'vue-router';
import {computed,ref} from 'vue';
const router = useRouter() 
const visibleRoutes = computed(() => {
    return routes.filter((item,index) => {
        if (item.meta?.hideInMenu) {
            return false;
        }
        return true;
    })
})
// 默认主页
const selectedKeys = ref("/configList");

const doMenuClick = (e) => {
    router.push({
        path: e.index,
    });
}
router.afterEach((to, from, failure) => {
  selectedKeys.value = to.path;
});
</script>

<style scoped>
#basicLayout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
:deep(.el-main){
    padding: 0;
}
.sidebar-logo-container {
    height: 48px;
    padding: 40px 10px 0 20px;
    margin-bottom: 30px;
}
.sidebar-logo-container .sidebar-logo-link {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
}
.logo {
    display: inline-block;
}
.sidebar-title {
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
    height: 32px;
    line-height: 32px;
    margin: 2px 0 0 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
    color: #fff
}
</style>