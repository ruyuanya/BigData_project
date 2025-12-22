<template>
  <div class="about-view">
    <div class="about-header">
      <h1><i class="el-icon-school"></i> 关于深圳城市职业学院</h1>
      <p class="subtitle">匠心育人 · 技能报国 · 服务社会</p>
    </div>
    
    <div class="about-container">
      <!-- 学院简介 -->
      <div class="intro-section">
        <div class="intro-content">
          <h2>学院简介</h2>
          <p>深圳城市职业学院创立于2000年，历经二十余年发展，已成为深圳市最具影响力的职业教育机构之一。学院坐落于深圳高新技术产业园区，占地面积300余亩，现有在校生8000余人。</p>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">20+</div>
              <div class="stat-label">办学历史</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">8000+</div>
              <div class="stat-label">在校学生</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">合作企业</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">就业率</div>
            </div>
          </div>
        </div>
        <div class="intro-image">
          <img src="@/img/logo.png" alt="深圳城市职业学院" class="campus-logo">
        </div>
      </div>
      
      <!-- 办学宗旨 -->
      <div class="mission-section">
        <h2><i class="el-icon-aim"></i> 办学宗旨</h2>
        <p class="mission-statement">学院秉承"工匠精神、技能报国"的办学宗旨，致力于培养适应新时代需求的高素质技能人才。</p>
        
        <div class="goals-grid">
          <div 
            v-for="goal in goals" 
            :key="goal.id"
            class="goal-card"
            @click="goToGoalDetail(goal.id)"
          >
            <div class="goal-icon">
              <i :class="goal.icon"></i>
            </div>
            <h3>{{ goal.title }}</h3>
            <p>{{ goal.description }}</p>
            <div class="goal-link">
              查看详情 <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 学院愿景 -->
      <div class="vision-section">
        <h2><i class="el-icon-view"></i> 学院愿景</h2>
        <div class="vision-content">
          <img src="@/img/left_bg.png" alt="学院愿景" class="vision-image">
          <div class="vision-text">
            <p>我们以培养适应新时代需求的高素质技能人才为己任，为深圳建设中国特色社会主义先行示范区贡献职业教育力量。学院致力于成为粤港澳大湾区职业教育改革发展的示范窗口，打造国内一流、国际知名的职业院校品牌。</p>
            <div class="vision-highlights">
              <div class="highlight">
                <i class="el-icon-check"></i>
                <span>产教深度融合</span>
              </div>
              <div class="highlight">
                <i class="el-icon-check"></i>
                <span>国际标准对接</span>
              </div>
              <div class="highlight">
                <i class="el-icon-check"></i>
                <span>数字技术赋能</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 返回首页按钮 -->
      <div class="back-section">
        <el-button 
          type="primary" 
          icon="el-icon-back"
          @click="$router.push('/')"
          class="back-btn"
        >
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      goals: [
        {
          id: 1,
          title: '专业化培养',
          description: '开设信息技术、现代服务业、智能制造等领域的特色专业',
          icon: 'el-icon-data-analysis'
        },
        {
          id: 2,
          title: '实践性教学',
          description: '建立完善的校企合作体系，实现学习与就业无缝对接',
          icon: 'el-icon-office-building'
        },
        {
          id: 3,
          title: '创新性发展',
          description: '紧跟产业变革趋势，持续优化课程体系和教学模式',
          icon: 'el-icon-lightning'
        }
      ]
    }
  },
  methods: {
    goToGoalDetail(id) {
      this.$router.push(`/goal-detail/${id}`)
    }
  }
}
</script>

<style scoped>
.about-view {
  padding: 30px 20px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
  min-height: 100vh;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h1 {
  color: #2c3e50;
  font-size: 2.2em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.subtitle {
  color: #409EFF;
  font-size: 1.1em;
  font-weight: 500;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 学院简介 */
.intro-section {
  display: flex;
  gap: 40px;
  align-items: center;
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.intro-content {
  flex: 1;
}

.intro-content h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.intro-content p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 25px;
  font-size: 1.05em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.intro-image {
  flex-shrink: 0;
}

.campus-logo {
  width: 200px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 办学宗旨 */
.mission-section {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.mission-section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8em;
}

.mission-statement {
  color: #555;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}


.goal-card {
  position: static; 
  top: auto;
  left: auto;
  z-index: auto;
}

.goal-card:hover {
  transform: translateY(-5px);
  border-color: #409EFF;
  box-shadow: 0 10px 25px rgba(64, 158, 255, 0.15);
  background: white;
}

.goal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #409EFF, #67C23A);
  opacity: 0;
  transition: opacity 0.3s;
}

.goal-card:hover::before {
  opacity: 1;
}

.goal-icon {
  font-size: 2.5em;
  color: #409EFF;
  margin-bottom: 20px;
}

.goal-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.goal-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.goal-link {
  color: #409EFF;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.goal-card:hover .goal-link {
  opacity: 1;
}

/* 学院愿景 */
.vision-section {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.vision-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8em;
}

.vision-content {
  display: flex;
  gap: 40px;
  align-items: center;
}

.vision-image {
  flex: 1;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  object-fit: cover;
}

.vision-text {
  flex: 1;
}

.vision-text p {
  color: #555;
  line-height: 1.8;
  font-size: 1.05em;
  margin-bottom: 25px;
}

.vision-highlights {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.highlight {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #409EFF;
  font-weight: 500;
}

.highlight i {
  font-size: 1.2em;
}

/* 返回按钮 */
.back-section {
  text-align: center;
  margin-top: 40px;
}

.back-btn {
  padding: 12px 40px;
  font-size: 1.1em;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .intro-section {
    flex-direction: column;
    text-align: center;
  }
  
  .vision-content {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 1.8em;
    flex-direction: column;
    gap: 10px;
  }
  
  .goals-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .intro-section,
  .mission-section,
  .vision-section {
    padding: 20px;
  }
}
</style>