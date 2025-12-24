<template>
  <div class="login-page">
    <!-- 左侧区域：保留标题和图片 -->
    <div class="pictrue">
      <h1>图书管理登录系统</h1>
      <img src="../img/logo.png" alt="" width="70%" height="70%">
      <h1></h1>
      <img src="../img/left_bg.png" alt="">
    </div>

    <!-- 右侧区域：简化登录表单 -->
    <div class="right-panel">
      
      <div class="form-group">
        <label>用户名：</label>
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>
      
      <div class="form-group">
        <label>密码：</label>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      
      <div class="form-group">
        <label>身份：</label>
        <select v-model="role">
          <option value="teacher">教师</option>
          <option value="student">学生</option>
        </select>
      </div>
      
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      
      <button @click="handleLogin" :disabled="loading" class="login-btn">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/book'

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      role: 'teacher',
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = '请输入用户名和密码'
        return
      }
      
      this.loading = true
      this.errorMessage = ''
      
      try {
        const response = await login({
          username: this.username,
          password: this.password,
          role: this.role
        })
        
        if (response.code === 200) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
          
          if (this.role === 'teacher') {
            this.$router.push('/admin/books/BookList')
          } else {
            this.$router.push('/')
          }
        }
      } catch (error) {
        this.errorMessage = error.message || '登录失败'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.login-page {
  position: relative;
  min-height: 100vh;
  background: white;
}

/* 左侧区域：保留原有样式 */
.pictrue {
  width: 40%;
  text-align: center;
  float: left;
}

.pictrue h1 {
  margin: 20px 0;
  font-size: 32px;
  color: #2c3e50;
}

/* 右侧区域 */
.right-panel {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-panel h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  text-align: center;
  margin: 10px 0;
}

/* 小屏幕自适应 */
@media (max-width: 900px) {
  .pictrue {
    float: none;
    width: 100%;
    margin-top: 30px;
  }

  .right-panel {
    position: static;
    transform: none;
    width: 100%;
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>