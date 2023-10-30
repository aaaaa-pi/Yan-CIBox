<template>
  <div id="UserLayout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main><router-view /></el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<style scoped>
#UserLayout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
:deep(.el-main){
    padding: 0;
}
</style>