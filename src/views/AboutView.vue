<template>
  <div class="home">
    <h1>欢迎来到图书馆管理系统</h1>
  <div class="about">
    <h1>关于深圳城市职业学院</h1>
    <p>深圳城市职业学院创立于2000年，历经二十余年发展，已成为深圳市最具影响力的职业教育机构之一。</p >
    
    <h3>办学宗旨</h3>
    <p>学院秉承"工匠精神、技能报国"的办学宗旨，致力于：</p >
    
    <h3>专业化培养</h3>
    <p>开设信息技术、现代服务业、智能制造等领域的特色专业</p >
    
    <h3>实践性教学</h3>
    <p>建立完善的校企合作体系，实现学习与就业无缝对接</p >
    
    <h3>创新性发展</h3>
    <p>紧跟产业变革趋势，持续优化课程体系和教学模式</p >
    
    <h3>学院愿景</h3>
    <p>我们以培养适应新时代需求的高素质技能人才为己任，为深圳建设中国特色社会主义先行示范区贡献职业教育力量。</p >
  </div>
  <div>
    <el-button type="primary" @click="$router.push('admin\books\BookList.vue')">图书管理</el-button>
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
  padding: 50px;
}

.home h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>
