<template>
  <div class="login-page">
    <div class="pictrue">
      <h1>图书管理登录系统</h1>
      <img src="../img/logo.png" alt="" width="70%" height="70%">
      <h1></h1>
      <img src="../img/left_bg.png" alt="">
    </div>

    <!-- 右侧区域：身份选择 / 登录占位，垂直居中 -->
    <div class="right-panel">
      <h2>请选择您的身份</h2>
      
      <!-- 身份选择：教师 / 学生 -->
      <div class="identity-selection" v-if="showIdentity">
        <button class="btn-role teacher" @click="choose('teacher')">教师身份</button>
        <button class="btn-role student" @click="choose('student')">学生身份</button>
      </div>

      <div class="login-placeholder" v-else>
        <h1>{{ selectedRole === 'teacher' ? '教师登录' : '学生登录' }}</h1>
        <div class="userstyle">
          <div>
            <input 
              type="text" 
              placeholder="用户名"
              v-model="username"
              style="width: 90%; height: 40px; margin-bottom: 30px;margin-top: 20px; padding: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;">
            
            <!-- 密码输入框容器 -->
            <div class="password-container">
              <input 
                :type="isShowPassword ? 'text' : 'password'" 
                placeholder="密码"
                v-model="password"
                @keyup.enter="handleLogin"
                style="width: 100%; height: 40px; padding: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; padding-right: 45px;">
              <!-- 显示/隐藏密码按钮 -->
              <button 
                type="button" 
                class="toggle-password"
                @click="togglePasswordVisibility">
                <span v-if="isShowPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
            
            <!-- 错误提示 -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            
            <button
              :disabled="loading"
              style="width: 80%; height: 50px; background-color: #409EFF; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; margin-top: 30px; margin-left: -30px;"
              @click="handleLogin">
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </div>
        </div>
        <button class="btn-back" @click="showIdentity = true">返回选择</button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/auth'
import { ElMessage } from 'element-plus'

export default {
  name: 'LoginPage',
  data() {
    return {
      showIdentity: true,
      isShowPassword: false,
      selectedRole: null,
      username: '',
      password: '',
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    choose(role) {
      this.selectedRole = role
      this.showIdentity = false
      this.errorMessage = ''
    },
    
    togglePasswordVisibility() {
      this.isShowPassword = !this.isShowPassword
    },
    
    async handleLogin() {
      // 表单验证
      if (!this.username.trim()) {
        this.errorMessage = '请输入用户名'
        return
      }
      if (!this.password.trim()) {
        this.errorMessage = '请输入密码'
        return
      }
      if (!this.selectedRole) {
        this.errorMessage = '请选择身份'
        return
      }

      this.loading = true
      this.errorMessage = ''

      try {
        const response = await login({
          username: this.username.trim(),
          password: this.password.trim(),
          role: this.selectedRole
        })

        if (response.code === 200) {
          ElMessage.success('登录成功')
          
          // 存储用户信息到localStorage
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          localStorage.setItem('token', response.data.token)
          
          // 根据角色跳转到不同页面
          if (this.selectedRole === 'teacher') {
            this.$router.push('/admin/books/BookList')
          } else {
            this.$router.push('/')
          }
        }
      } catch (error) {
        console.error('登录失败:', error)
        this.errorMessage = error.message || '登录失败，请检查用户名和密码'
        ElMessage.error(this.errorMessage)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
/* 原有样式保持不变 */
.pictrue {
  width: 40%;
  text-align: center;
  float: left;
  /* 保持左侧展示 */
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

.identity-selection {
  margin-top: 0;
  text-align: center;
}

.btn-role {
  display: inline-block;
  margin: 0 12px;
  padding: 10px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.btn-role.teacher {
  width: 160px;
  height: 80px;
  color: black;
}

.btn-role.student {
  width: 160px;
  height: 80px;
  color: black;
}

.login-placeholder {
  width: 100%;
  margin-top: 8px;
  text-align: center;
}

.btn-back {
  margin-top: 16px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.userstyle {
  width: 100%;
  padding: 20px;
}

/* 密码输入框容器 - 改回之前的版本 */
.password-container {
  position: relative;
  width: 90%;
  margin-bottom: 30px;
  box-sizing: border-box;
}

/* 确保用户名输入框也有相同的容器样式 */
.userstyle > div > input[type="text"] {
  width: 90%;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
}

/* 调整密码输入框样式 */
.password-container input {
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  padding-right: 45px;
}

/* 显示/隐藏密码按钮 */
.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  color: #666;
  outline: none;
}

.toggle-password:hover {
  color: #409EFF;
}

.toggle-password:focus {
  outline: none;
}

/* 错误提示样式 */
.error-message {
  color: #f56c6c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
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
  }

  .btn-role {
    margin: 8px;
    width: 40%;
  }
}
</style>