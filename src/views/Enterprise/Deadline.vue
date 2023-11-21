<script setup>
//上报时限页面
import {
    Edit
} from '@element-plus/icons-vue'

import { ref } from 'vue'




//通知列表数据模型
const deadlines = ref([
    {
        "deadline":"2023-11-11 12:00:00",       
    },
    {
        "deadline":"2023-11-11 12:00:00",       
    },
    {
        "deadline":"2023-11-11 12:00:00",       
    }
  
])



//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(6)//总条数
const pageSize = ref(3)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>通知中心</span>
                <div class="extra">
                    <el-button type="primary" >新增调查期</el-button>
                </div>
            </div>
        </template>
       
        <!-- 通知列表 -->
        <el-table :data="deadlines" style="width: 100%">
            <el-table-column label="时限"  prop="deadline" ></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" > </el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
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