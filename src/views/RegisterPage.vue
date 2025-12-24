<template>
  <div class="register-page">
    <!-- 左侧区域：与登录页保持一致 -->
    <div class="pictrue">
      <h1>图书管理注册系统</h1>
      <img src="../img/logo.png" alt="" width="70%" height="70%">
      <h1></h1>
      <img src="../img/left_bg.png" alt="">
    </div>

    <!-- 右侧区域：注册表单，垂直居中 -->
    <div class="right-panel">
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label>用户名:</label>
          <input v-model="form.username" type="text" required placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <label>密码:</label>
          <div class="password-container">
            <input v-model="form.password" type="password" required placeholder="请输入密码">
          </div>
        </div>
        <div class="form-group">
          <label>确认密码:</label>
          <div class="password-container">
            <input v-model="form.confirmPassword" type="password" required placeholder="请确认密码">
          </div>
        </div>
        <div class="form-group">
          <label>角色:</label>
          <select v-model="form.role" required>
            <option value="">请选择角色</option>
            <option value="teacher">教师</option>
            <option value="student">学生</option>
          </select>
        </div>
        <button type="submit" :disabled="loading" class="register-btn">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>
      <p class="login-link">
        已有账号？<router-link to="/Login">立即登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'RegisterPage',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        real_name: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        ElMessage.error('两次输入的密码不一致')
        return
      }

      this.loading = true
      try {
        await this.$axios.post('/api/auth/register', this.form)
        ElMessage.success('注册成功')
        this.$router.push('/login')
      } catch (error) {
        ElMessage.error('注册失败: ' + (error.response?.data?.message || error.message))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  position: relative;
  min-height: 100vh;
  background: white;
}

/* 左侧区域：与登录页保持一致 */
.pictrue {
  width: 40%;
  text-align: center;
  float: left;
  color: #2c3e50;
}

.pictrue h1 {
  margin: 20px 0;
  font-size: 32px;
}

/* 右侧容器：固定宽度，垂直居中，靠右 */
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

/* 去掉方框：移除背景色、阴影和边框 */
.register-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  font-size: 14px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

.password-container {
  position: relative;
  width: 100%;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: #409EFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.register-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #333;
}

.login-link a {
  color: #409EFF;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}

/* 小屏幕自适应：右侧改为顶部堆叠 */
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

  .register-form {
    width: 100%;
  }
}
</style>