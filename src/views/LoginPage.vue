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
            <input type="username" placeholder="用户名"
              style="width: 90%; height: 40px; margin-bottom: 30px;margin-top: 20px; padding: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;">
            <input type="password" placeholder="密码"
              style="width: 90%; height: 40px; margin-bottom: 30px; padding: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;">
            <button
              style="width: 80%; height: 50px; background-color: #409EFF; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;">登录</button>

          </div>
        </div>
        <button class="btn-back" @click="showIdentity = true">返回选择</button>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      showIdentity: true,
      selectedRole: null
    }
  },
  methods: {
    choose(role) {
      this.selectedRole = role
      this.showIdentity = false
    }
  }
}
</script>

<style>
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
