<template>
  <div class="home">
    <h1>欢迎来到图书馆管理系统</h1>
    <div>
      <el-button type="primary" @click="$router.push('admin\books\BookList.vue')">图书管理</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}

.home h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>
