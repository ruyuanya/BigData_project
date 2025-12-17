<template>
  <ul>
    <li><router-link to="/">首页</router-link></li>
    <li><router-link to="/about">关于我们</router-link></li>
    <li style="float:right"><router-link to="/Login">登录</router-link></li>
    <li style="float:right"><router-link to="/register">注册</router-link></li>
    <li style="float:right"><router-link to="/admin/books/BookList">图书管理</router-link></li>
  </ul>

  <div style="margin-top: 60px;">
    <router-view></router-view>
  </div>
</template>

<script setup>
// import BookList from '@/views/admin/books/BookList.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
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
  transition: all 0.5s;
  cursor: pointer;
}

/* 加了个动画 */
li  {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

li :after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

li:hover  {
  background-color: #111;
  padding-right: 25px;
}

li:hover :after {
  opacity: 1;
  right: 0;
}
</style>
