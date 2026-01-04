<template>
  <el-container class="admin-layout">
    <el-aside width="220px">
      <el-menu router :default-active="$route.path">
        <!-- 仪表盘 -->
        <el-menu-item index="/admin/dashboard">
          <el-icon><PieChart /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        
        <!-- 图书管理菜单 -->
        <el-sub-menu index="book-management">
          <template #title>
            <el-icon><Reading /></el-icon>
            <span>图书管理</span>
          </template>
          <el-menu-item index="/admin/books/list">
            图书列表
          </el-menu-item>
          <el-menu-item index="/admin/books/add">
            添加图书
          </el-menu-item>
          <el-menu-item index="/admin/books/categories">
            分类管理
          </el-menu-item>
        </el-sub-menu>
        
        <!-- 其他菜单 -->
        <el-sub-menu index="user-management">
          <template #title>
            <el-icon><User /></el-icon>
            <span>人员管理</span>
          </template>
          <el-menu-item index="/admin/users/teachers">教师管理</el-menu-item>
          <el-menu-item index="/admin/users/students">学生管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    
    <el-main>
      <!-- 这里是图书列表页面内容 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { PieChart, Reading, User } from '@element-plus/icons-vue'

export default {
  name: 'AdminLayout',
  components: {
    PieChart,
    Reading,
    User
  }
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}
</style>