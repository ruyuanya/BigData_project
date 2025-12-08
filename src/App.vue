<template>
  <div>
    <!-- 导航栏 -->
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/about">关于我们</router-link></li>
      <li style="float:right"><router-link to="/login">登录</router-link></li>
      <li style="float:right"><router-link to="/register">注册</router-link></li>
    </ul>
    
    <!-- 路由视图容器 - 这是显示页面的关键 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 添加内容区域的样式，避免被导航栏覆盖 */
.content {
  margin-top: 60px;
  padding: 20px;
}

/* 顶部导航 */
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  /* 固定导航栏 */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* 确保导航栏在最上层 */
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* 鼠标悬停时将链接颜色更改为 #111（黑色）*/
li a:hover {
  background-color: #111;
}

/* 当前激活的路由链接样式 */
li a.router-link-exact-active {
  background-color: #42b983;
  color: white;
}
</style>