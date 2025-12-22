<template>
  <div class="goal-detail">
    <!-- 返回按钮 -->
    <div class="back-button">
      <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">
        返回首页
      </el-button>
    </div>
    
    <!-- 详情内容 -->
    <div class="detail-container">
      <div class="detail-header">
        <h1>{{ currentGoal.title }}</h1>
        <div class="goal-tag">{{ getGoalTag(currentGoal.id) }}</div>
      </div>
      
      <div class="detail-content">
        <!-- 专业化培养详情 -->
        <div v-if="currentGoal.id === 1" class="goal-section">
          <div class="goal-image">
            <img src="@/assets/fireman.jpg" alt="专业化培养" />
          </div>
          <div class="goal-text">
            <h2>信息技术专业群</h2>
            <ul>
              <li>人工智能与大数据应用</li>
              <li>云计算与网络安全</li>
              <li>移动应用开发</li>
              <li>物联网工程技术</li>
              <li>数字媒体技术</li>
            </ul>
            
            <h2>现代服务业专业群</h2>
            <ul>
              <li>智慧物流管理</li>
              <li>数字商贸与电子商务</li>
              <li>高端会议与酒店管理</li>
              <li>现代金融服务</li>
              <li>健康服务与管理</li>
            </ul>
            
            <h2>智能制造专业群</h2>
            <ul>
              <li>工业机器人技术</li>
              <li>智能控制技术</li>
              <li>3D打印与逆向工程</li>
              <li>新能源汽车技术</li>
              <li>精密模具设计</li>
            </ul>
            
            <div class="highlight-box">
              <h3>培养特色</h3>
              <p>实施"1+X"证书制度，将职业资格证书融入课程体系，实现"课证融通"。</p>
            </div>
          </div>
        </div>
        
        <!-- 实践性教学详情 -->
        <div v-else-if="currentGoal.id === 2" class="goal-section">
          <div class="goal-image">
            <img src="@/img/left_bg.png" alt="实践性教学" />
          </div>
          <div class="goal-text">
            <h2>校企合作模式</h2>
            <div class="cooperation-model">
              <div class="model-item">
                <h3>订单式培养</h3>
                <p>与华为、腾讯、比亚迪等龙头企业合作开设"订单班"</p>
              </div>
              <div class="model-item">
                <h3>工学交替</h3>
                <p>实施"校内学习-企业实践-返校提升"的循环培养模式</p>
              </div>
              <div class="model-item">
                <h3>现代学徒制</h3>
                <p>企业师傅与学校教师共同培养，实现双重身份、双元育人</p>
              </div>
            </div>
            
            <h2>实训基地建设</h2>
            <ul>
              <li><strong>校内实训中心:</strong> 建有智能制造、信息技术等8个实训中心</li>
              <li><strong>校外实训基地:</strong> 与200余家企业建立稳定的合作关系</li>
              <li><strong>虚拟仿真实训:</strong> 利用VR/AR技术开展高风险、高成本实训</li>
            </ul>
            
            <div class="stats-box">
              <h3>实践教学成果</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">98.5%</div>
                  <div class="stat-label">毕业生就业率</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">200+</div>
                  <div class="stat-label">合作企业</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">85%</div>
                  <div class="stat-label">专业对口率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 创新性发展详情 -->
        <div v-else-if="currentGoal.id === 3" class="goal-section">
          <div class="goal-image">
            <img src="@/img/图书.png" alt="创新性发展" />
          </div>
          <div class="goal-text">
            <h2>教学创新改革</h2>
            <div class="innovation-item">
              <h3>项目化教学</h3>
              <p>以真实项目为载体，实施"教学做一体化"教学模式</p>
            </div>
            <div class="innovation-item">
              <h3>模块化课程</h3>
              <p>根据岗位能力需求，构建模块化、可组合的课程体系</p>
            </div>
            <div class="innovation-item">
              <h3>混合式教学</h3>
              <p>线上线下结合，利用智慧教学平台开展翻转课堂</p>
            </div>
            
            <h2>技术创新平台</h2>
            <ul>
              <li><strong>技术研发中心:</strong> 聚焦产业关键技术，开展应用技术研发</li>
              <li><strong>创新创业学院:</strong> 指导学生参与创新创业大赛和项目孵化</li>
              <li><strong>大师工作室:</strong> 聘请行业大师引领技术传承与创新</li>
              <li><strong>国际合作平台:</strong> 引进国际先进职业教育标准与资源</li>
            </ul>
            
            <div class="timeline">
              <h3>发展规划路线图</h3>
              <div class="timeline-item">
                <div class="year">2023-2024</div>
                <div class="content">建成省级高水平专业群2个</div>
              </div>
              <div class="timeline-item">
                <div class="year">2024-2025</div>
                <div class="content">实现主要专业数字化教学资源全覆盖</div>
              </div>
              <div class="timeline-item">
                <div class="year">2025-2026</div>
                <div class="content">建成国家级职业教育教师教学创新团队</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalDetail',
  data() {
    return {
      goalId: null,
      goals: [
        { id: 1, title: '专业化培养' },
        { id: 2, title: '实践性教学' },
        { id: 3, title: '创新性发展' }
      ]
    }
  },
  computed: {
    currentGoal() {
      const id = this.goalId || parseInt(this.$route.params.id)
      return this.goals.find(goal => goal.id === id) || this.goals[0]
    }
  },
  mounted() {
    this.goalId = parseInt(this.$route.params.id)
  },
  methods: {
    getGoalTag(id) {
      const tags = {
        1: '专业建设',
        2: '产教融合', 
        3: '改革创新'
      }
      return tags[id] || '详情'
    }
  }
}
</script>

<style scoped>
.goal-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.back-button {
  margin-bottom: 30px;
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.detail-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #409EFF;
  padding-bottom: 20px;
}

.detail-header h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.goal-tag {
  display: inline-block;
  background: #409EFF;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9em;
}

.goal-section {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.goal-image {
  flex: 1;
}

.goal-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.goal-text {
  flex: 2;
}

.goal-text h2 {
  color: #409EFF;
  margin: 25px 0 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.goal-text ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.goal-text li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.highlight-box, .stats-box {
  background: #f0f7ff;
  border-left: 4px solid #409EFF;
  padding: 20px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
}

.cooperation-model, .innovation-item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.model-item, .innovation-item {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eaeaea;
}

.model-item h3, .innovation-item h3 {
  color: #409EFF;
  margin-bottom: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
}

.stat-item {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
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

.timeline {
  margin-top: 30px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #409EFF;
}

.timeline-item {
  position: relative;
  padding-left: 30px;
  margin-bottom: 25px;
}

.timeline-item .year {
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.timeline-item .content {
  color: #666;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .goal-section {
    flex-direction: column;
  }
  
  .detail-container {
    padding: 20px;
  }
  
  .detail-header h1 {
    font-size: 1.8em;
  }
  
  .cooperation-model, .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    gap: 10px;
  }
}
</style>