<template>
  <div class="home">
    <h1>欢迎来到图书馆管理系统</h1>
    
    <div class="about">
      <!-- 使用Flexbox布局容器 -->
      <div class="header-section">
        <div class="text-content">
          <h1>关于深圳城市职业学院</h1>
          <p>深圳城市职业学院创立于2000年，历经二十余年发展，已成为深圳市最具影响力的职业教育机构之一。</p>
        </div>
        <div class="logo-container">
          <img src="../img/logo.png" alt="学院logo" class="logo-img">
        </div>
      </div>
      
      <div class="content-section">
        <div class="left-image">
          <img src="../img/left_bg.png" alt="学院背景" class="bg-img">
        </div>
        
        <div class="right-content">
          <h3>办学宗旨</h3>
          <p>学院秉承"工匠精神、技能报国"的办学宗旨，致力于：</p>
          
          <div class="goals-list">
            <div class="goal-item">
              <h3>专业化培养</h3>
              <p>开设信息技术、现代服务业、智能制造等领域的特色专业</p>
            </div>
            
            <div class="goal-item">
              <h3>实践性教学</h3>
              <p>建立完善的校企合作体系，实现学习与就业无缝对接</p>
            </div>
            
            <div class="goal-item">
              <h3>创新性发展</h3>
              <p>紧跟产业变革趋势，持续优化课程体系和教学模式</p>
            </div>
          </div>
          
          <h3>学院愿景</h3>
          <p>我们以培养适应新时代需求的高素质技能人才为己任，为深圳建设中国特色社会主义先行示范区贡献职业教育力量。</p>
        </div>
      </div>
    </div>
    
    <!-- <div>
      <el-button type="primary" @click="$router.push('admin\books\BookList.vue')">图书管理</el-button>
    </div> -->
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

/* 头部区域 - 标题和logo左右布局 */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  text-align: left;
}

.text-content {
  flex: 1;
  padding-right: 30px;
}

.logo-container {
  flex-shrink: 0;
}

.logo-img {
  width: 99%;
  height: auto;
  max-width: 200px;
}

/* 主体内容区域 - 图片和内容左右布局 */
.content-section {
  display: flex;
  gap: 30px;
  text-align: left;
}

.left-image {
  flex: 1;
}

.bg-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.right-content {
  flex: 1.2;
}

/* 目标列表样式 */
.goals-list {
  margin: 20px 0;
}

.goal-item {
  margin-bottom: 25px;
  padding-left: 15px;
  border-left: 3px solid #409EFF;
}

.goal-item h3 {
  color: #409EFF;
  margin-bottom: 8px;
}

.goal-item p {
  color: #666;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-section,
  .content-section {
    flex-direction: column;
  }
  
  .text-content {
    padding-right: 0;
    margin-bottom: 20px;
  }
  
  .logo-img {
    width: 50%;
    margin: 0 auto;
  }
  
  .content-section {
    gap: 20px;
  }
}
</style>