<template>
  <div class="book-list">
    <div class="header">
      <h2>图书管理</h2>
      <div class="search-box">
        <input v-model="searchText" placeholder="搜索图书...">
        <button @click="loadBooks">搜索</button>
        <button @click="showAddDialog" class="add-btn">添加图书</button>
      </div>
    </div>

    <table class="book-table">
      <thead>
        <tr>
          <th>作者</th>
          <th>书名</th>
          <th>分类</th>
          <th>出版社</th>
          <th>库存</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in bookList" :key="book.id">
          <td>{{ book.author }}</td>
          <td>{{ book.bookname }}</td>
          <td>{{ book.category }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.inventory }}</td>
          <td>
            <span :class="getStatusClass(book.status)">
              {{ getStatusText(book.status) }}
            </span>
          </td>
          <td>
            <button @click="editBook(book)" class="edit-btn">编辑</button>
            <button @click="deleteBook(book)" class="delete-btn">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 添加/编辑对话框 -->
    <div v-if="showDialog" class="dialog">
      <div class="dialog-content">
        <h3>{{ isEditing ? '编辑图书' : '添加图书' }}</h3>

        <div class="form-group">
          <label>作者：</label>
          <input v-model="formData.author">
        </div>

        <div class="form-group">
          <label>书名：</label>
          <input v-model="formData.bookname">
        </div>

        <div class="form-group">
          <label>分类：</label>
          <input v-model="formData.category">
        </div>

        <div class="form-group">
          <label>出版社：</label>
          <input v-model="formData.publisher">
        </div>

        <div class="form-group">
          <label>库存：</label>
          <input v-model="formData.inventory">
        </div>

        <div class="form-group">
          <label>状态：</label>
          <select v-model="formData.status">
            <option value="1">可借阅</option>
            <option value="0">已借出</option>
          </select>
        </div>

        <div class="dialog-buttons">
          <button @click="saveBook">保存</button>
          <button @click="closeDialog">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks } from '@/api/book.js'

export default {
  name: 'BookList',
  data() {
    return {
      bookList: [],
      searchText: '',
      showDialog: false,
      isEditing: false,
      formData: {
        id: '',
        author: '',
        bookname: '',
        category: '',
        publisher: '',
        inventory: '',
        status: '1'
      }
    }
  },
  mounted() {
    this.loadBooks()
  },
  methods: {
    async loadBooks() {
      try {
        const res = await getBooks({
          keyword: this.searchText
        })
        // 处理API返回的数据结构
        console.log('API返回数据:', res)
        if (res.data && Array.isArray(res.data)) {
          // 如果是二维数组，取第一个元素
          if (res.data.length > 0 && Array.isArray(res.data[0])) {
            this.bookList = res.data[0]
          } else {
            this.bookList = res.data
          }
        } else if (res.data && res.data[0] && res.data[0][0]) {
          // 兼容之前的结构
          this.bookList = res.data[0][0]
        } else {
          this.bookList = []
        }
      } catch (error) {
        console.error('加载图书失败:', error)
        this.bookList = []
      }
    },

    showAddDialog() {
      this.isEditing = false
      this.formData = {
        id: '',
        author: '',
        bookname: '',
        category: '',
        publisher: '',
        inventory: '',
        status: '1'
      }
      this.showDialog = true
    },

    editBook(book) {
      this.isEditing = true
      this.formData = { ...book }
      this.showDialog = true
    },

    async saveBook() {
      try {
        alert('图书操作功能正在开发中...')
        this.showDialog = false
      } catch (error) {
        alert('操作失败')
      }
    },

    async deleteBook(book) {
      if (confirm(`确定要删除《${book.bookname}》吗？`)) {
        try {
          alert('删除功能正在开发中...')
          // await deleteBook(book.id)
          // this.loadBooks()
        } catch (error) {
          alert('删除失败')
        }
      }
    },

    closeDialog() {
      this.showDialog = false
    },

    getStatusText(status) {
      const map = { 0: '已借出', 1: '可借阅'}
      return map[status] || '未知'
    },

    getStatusClass(status) {
      const map = { 0: 'status-loaned', 1: 'status-available', 2: 'status-maintenance' }
      return map[status] || 'status-unknown'
    }
  }
}
</script>

<style>
.book-list {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.search-box input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.book-table th,
.book-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.book-table th {
  background-color: #f5f5f5;
}

.status-available {
  color: green;
  font-weight: bold;
}

.status-loaned {
  color: red;
  font-weight: bold;
}

.status-maintenance {
  color: orange;
  font-weight: bold;
}

.edit-btn {
  background: #409EFF;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.delete-btn {
  background: #f56c6c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  background: #67c23a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dialog-buttons {
  margin-top: 20px;
  text-align: right;
}

.dialog-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-buttons button:first-child {
  background: #409EFF;
  color: white;
}
</style>