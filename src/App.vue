<template>
  <ul>
    <li><router-link to="/">首页</router-link></li>
    <li><router-link to="/about">关于我们</router-link></li>
    <li style="float:right"><router-link to="/login">登录</router-link></li>
    <li style="float:right"><router-link to="/register">注册</router-link></li>
  </ul>
  <!--   <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
</template>

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
}

/* 鼠标悬停时将链接颜色更改为 #111（黑色）*/
li a:hover {
  background-color: #111;
}

</style>
