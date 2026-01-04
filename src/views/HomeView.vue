<template>
  <div class="home">
    <h1>欢迎来到图书馆管理系统</h1>
    
    <div class="welcome-content">
      <div class="system-intro">
        <h2><i class="el-icon-collection"></i> 系统简介</h2>
        <p>本系统提供图书信息管理、借阅记录查询、读者服务等功能，助力图书馆数字化管理。</p>
      </div>
      
      <div class="quick-access">
        <h2><i class="el-icon-thumb"></i> 快速访问</h2>
        <div class="access-buttons">
          <el-button 
            type="primary" 
            icon="el-icon-notebook-2"
            @click="$router.push('/admin/books/BookList')"
            class="action-btn"
            size="large"
          >
            进入图书管理
          </el-button>
          <el-button 
            type="info" 
            icon="el-icon-school"
            @click="$router.push('/about')"
            class="action-btn"
            size="large"
          >
            关于深圳城职院
          </el-button>
          <el-button 
            type="success" 
            icon="el-icon-user"
            @click="$router.push('Login')"
            class="action-btn"
            size="large"
          >
            用户登录
          </el-button>
        </div>
      </div>
      
      <div class="features">
        <h2><i class="el-icon-star-off"></i> 系统特色</h2>
        <div class="feature-list">
          <div class="feature-item">
            <i class="el-icon-search feature-icon"></i>
            <h3>智能检索</h3>
            <p>快速查找图书信息</p>
          </div>
          <div class="feature-item">
            <i class="el-icon-timer feature-icon"></i>
            <h3>借阅管理</h3>
            <p>自动化借还书流程</p>
          </div>
          <div class="feature-item">
            <i class="el-icon-data-analysis feature-icon"></i>
            <h3>数据统计</h3>
            <p>图书借阅数据分析</p>
          </div>
        </div>
      </div>
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
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: calc(100vh - 80px);
}

.home h1 {
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2.5em;
  font-weight: 600;
}

.welcome-content {
  max-width: 1000px;
  margin: 0 auto;
}

.system-intro, .quick-access, .features {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.system-intro h2, .quick-access h2, .features h2 {
  color: #409EFF;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.system-intro p {
  color: #666;
  line-height: 1.6;
  font-size: 1.1em;
}

.access-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  flex: 1;
  min-width: 180px;
  padding: 12px 20px;
  font-size: 1em;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(64, 158, 255, 0.1);
}

.feature-icon {
  font-size: 2.5em;
  color: #409EFF;
  margin-bottom: 15px;
}

.feature-item h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.feature-item p {
  color: #666;
  font-size: 0.95em;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 20px 15px;
  }
  
  .home h1 {
    font-size: 2em;
  }
  
  .access-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
}
</style>