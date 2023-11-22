<script setup>
import {
  Search,
  Check,
  Close
} from '@element-plus/icons-vue'

import {ref} from 'vue'

const enterprise = ref('')//用户搜索时输入的企业名称
const city = ref('')//用户搜索时选中的城市
const checkstate = ref('')//用户搜索时选中的审核状态

//用户搜索时选中的分类id
const categoryId = ref('')

//用户搜索时选中的发布状态
const state = ref('')

//文章列表数据模型
const articles = ref([
  {
    "id": 5,
    "title": "无衣烦",
    "city": "北京",
    "state": "已通过",
    "uploadTime": "2023-09-03 11:55:30",
  },
  {
    "id": 5,
    "title": "苏东吴",
    "city": "北京",
    "state": "已通过",
    "uploadTime": "2023-09-03 11:55:30",
  },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  // articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  // articleList()
}


//添加表单数据模型
const articleModel = ref({
  title: '',
  categoryId: '',
  coverImg: '',
  content: '',
  state: ''
})

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>企业备案管理</span>

      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="企业名称：">
        <el-input
            v-model="enterprise"
            class="w-50 m-2"
            placeholder="请输入查询企业名称"
            :prefix-icon="Search"
        />
      </el-form-item>

      <el-form-item label="所属市级：">
        <el-select placeholder="请选择" v-model="city">
            <el-option label="昆明市" value="昆明市"></el-option>
            <el-option label="曲靖市" value="曲靖市"></el-option>
            <el-option label="玉溪市" value="玉溪市"></el-option>
            <el-option label="昭通市" value="昭通市"></el-option>
            <el-option label="保山市" value="保山市"></el-option>
            <el-option label="丽江市" value="丽江市"></el-option>
            <el-option label="普洱市" value="普洱市"></el-option>
            <el-option label="临沧市" value="临沧市"></el-option>
            <el-option label="德宏傣族景颇族自治州" value="德宏傣族景颇族自治州"></el-option>
            <el-option label="怒江傈僳族自治州" value="怒江傈僳族自治州"></el-option>
            <el-option label="迪庆藏族自治州" value="迪庆藏族自治州"></el-option>
            <el-option label="大理白族自治州" value="大理白族自治州"></el-option>
            <el-option label="楚雄彝族自治州" value="楚雄彝族自治州"></el-option>
            <el-option label="红河哈尼族彝族自治州" value="红河哈尼族彝族自治州"></el-option>
            <el-option label="文山壮族苗族自治州" value="文山壮族苗族自治州"></el-option>
            <el-option label="西双版纳傣族自治州" value="西双版纳傣族自治州"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="审核状态：">
        <el-select placeholder="请选择" v-model="checkstate">
          <el-option label="已通过" value="已通过"></el-option>
          <el-option label="待审核" value="待审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">搜索</el-button>
        <el-button @click="categoryId = ''; state = ''">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="articles" style="width: 100%">
      <el-table-column label="企业名称" prop="title"></el-table-column>
      <el-table-column label="所属市级" prop="city"></el-table-column>
      <el-table-column label="填报日期" prop="uploadTime"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button :icon="Check" circle plain type="success" @click=""></el-button>
          <el-button :icon="Search" circle plain type="info" @click=""></el-button>
          <el-button :icon="Close" circle plain type="danger" @click=""></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
                   layout="jumper, total, sizes, prev, pager, next" background :total="total"
                   @size-change="onSizeChange"
                   @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end"/>


  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

/* 抽屉样式 */
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>