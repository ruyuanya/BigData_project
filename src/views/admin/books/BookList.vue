<template>
    <div class="simple-book-list">
        <!-- 搜索和操作栏 -->
        <div class="header">
            <div class="search-box">
                <el-input 
                    v-model="searchText" 
                    placeholder="搜索图书名称、作者或ISBN" 
                    style="width: 300px" 
                    clearable
                >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
                <el-button type="primary" @click="loadBooks">搜索</el-button>
            </div>
            <el-button type="success" @click="handleAdd" class="add-btn">
                <el-icon><Plus /></el-icon>
                添加图书
            </el-button>
        </div>

        <!-- 图书卡片列表 -->
        <div class="book-cards">
            <div 
                v-for="book in bookList" 
                :key="book.id" 
                class="book-card"
            >
                <div class="book-info">
                    <h3 class="book-title">{{ book.title }}</h3>
                    <div class="book-details">
                        <div class="detail-item">
                            <span class="label">作者：</span>
                            <span class="value">{{ book.author }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">ISBN：</span>
                            <span class="value">{{ book.isbn }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">分类：</span>
                            <span class="value">{{ book.category }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">出版社：</span>
                            <span class="value">{{ book.publisher }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">状态：</span>
                            <span class="status" :class="getStatusClass(book.status)">
                                {{ getStatusText(book.status) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="book-actions">
                    <el-button size="small" @click="handleEdit(book)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(book)">删除</el-button>
                    <el-button size="small" type="info" @click="handleView(book)">详情</el-button>
                </div>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, next, jumper"
                @size-change="loadBooks"
                @current-change="loadBooks"
            />
        </div>

        <!-- 添加/编辑对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
            <el-form :model="formData" label-width="80px">
                <el-form-item label="图书名称" required>
                    <el-input v-model="formData.title" />
                </el-form-item>
            
                <el-form-item label="作者" required>
                    <el-input v-model="formData.author" />
                </el-form-item>
            
                <el-form-item label="ISBN" required>
                    <el-input v-model="formData.isbn" />
                </el-form-item>
            
                <el-form-item label="分类">
                    <el-input v-model="formData.category" />
                </el-form-item>
            
                <el-form-item label="出版社">
                    <el-input v-model="formData.publisher" />
                </el-form-item>
            
                <el-form-item label="总数量" required>
                    <el-input-number
                        v-model="formData.total"
                        :min="1"
                        :max="999"
                    />
                </el-form-item>
            
                <el-form-item label="状态">
                    <el-select v-model="formData.status">
                        <el-option label="可借阅" :value="1" />
                        <el-option label="已借出" :value="0" />
                        <el-option label="维护中" :value="2" />
                    </el-select>
                </el-form-item>
            </el-form>
        
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { getBooks, addBook, updateBook, deleteBook } from '@/api/modules/book.js'

// 数据
const searchText = ref('')
const bookList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const formData = ref({
  id: '',
  title: '',
  author: '',
  isbn: '',
  category: '',
  publisher: '',
  total: 1,
  status: 1
})

// 状态文本和样式
const getStatusText = (status) => {
  const statusMap = {
    0: '已借出',
    1: '可借阅',
    2: '维护中'
  }
  return statusMap[status] || '未知'
}

const getStatusClass = (status) => {
  const classMap = {
    0: 'status-loaned',
    1: 'status-available',
    2: 'status-maintenance'
  }
  return classMap[status] || 'status-unknown'
}

// 加载图书列表
const loadBooks = async () => {
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchText.value
    }
    
    const res = await getBooks(params)
    bookList.value = res.data?.list || res.data || []
    total.value = res.data?.total || res.total || bookList.value.length
  } catch (error) {
    ElMessage.error('加载失败')
    // 使用模拟数据
    // bookList.value = [
    //   {
    //     id: 1,
    //     title: 'Vue.js设计与实现',
    //     author: '霍春阳', 
    //     isbn: '9787115585629',
    //     category: '前端',
    //     publisher: '人民邮电出版社',
    //     total: 10,
    //     available: 8,
    //     status: 1
    //   },
    //   {
    //     id: 2,
    //     title: 'JavaScript高级程序设计',
    //     author: 'Matt Frisbie',
    //     isbn: '9787115599754',
    //     category: '前端',
    //     publisher: '人民邮电出版社',
    //     total: 15,
    //     available: 5,
    //     status: 0
    //   },
    //   {
    //     id: 3,
    //     title: '深入理解计算机系统',
    //     author: 'Randal E. Bryant',
    //     isbn: '9787111544937',
    //     category: '计算机基础',
    //     publisher: '机械工业出版社',
    //     total: 8,
    //     available: 8,
    //     status: 1
    //   }
    // ]
    total.value = bookList.value.length
  }
}

// 操作函数
const handleAdd = () => {
  dialogTitle.value = '添加图书'
  formData.value = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    total: 1,
    status: 1
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑图书'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleView = (row) => {
  ElMessage.info(`查看图书：${row.title}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除《${row.title}》吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await deleteBook(row.id)
    ElMessage.success('删除成功')
    loadBooks()
  } catch {
    // 用户取消删除
  }
}

const handleSubmit = async () => {
  try {
    if (formData.value.id) {
      await updateBook(formData.value)
      ElMessage.success('更新成功')
    } else {
      await addBook(formData.value)
      ElMessage.success('添加成功')
    }
    
    dialogVisible.value = false
    loadBooks()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 初始化加载
onMounted(() => {
  loadBooks()
})
</script>

<style scoped>
.simple-book-list {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-box {
  display: flex;
  gap: 10px;
  align-items: center;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 5px;
}

.book-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.book-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.book-title {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.book-details {
  flex: 1;
}

.detail-item {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}

.label {
  font-weight: 500;
  color: #606266;
  min-width: 60px;
}

.value {
  color: #303133;
  flex: 1;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-available {
  background-color: #f0f9ff;
  color: #1890ff;
}

.status-loaned {
  background-color: #fff2f0;
  color: #ff4d4f;
}

.status-maintenance {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-unknown {
  background-color: #f5f5f5;
  color: #8c8c8c;
}

.book-actions {
  margin-top: 15px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.pagination {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}
</style>