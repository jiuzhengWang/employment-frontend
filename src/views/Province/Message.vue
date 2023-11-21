<script setup>
//发布通知页面
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

import {Plus} from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer1 = ref(false)
//添加表单数据模型
const newnoticeModel = ref({
    title: '',
    content:'',
    state:''
})

//通知列表数据模型
const notice = ref([
    {
        "id":"1",
        "title":"标题1",
        "createTime":"2023-11-11 12:00:00",
        "context":"请各单位尽快上报数据"
    },
    {
        "id":"2",
        "title":"标题1",
        "createTime":"2023-11-11 12:00:00",
        "context":"456"
    },
    {
        "id":"3",
        "title":"标题1",
        "createTime":"2023-11-11 12:00:00",
        "context":"789"
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
                    <el-button type="primary" @click="visibleDrawer1 = true">发布通知</el-button>
                </div>
            </div>
        </template>
       
        <!-- 通知列表 -->
        <el-table :data="notice" style="width: 100%">
            <el-table-column label="标题" width="400" prop="title" ></el-table-column>
            <el-table-column label="发布时间" prop="createTime"> </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" > </el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
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

    <!-- 抽屉 -->
    <el-drawer v-model="visibleDrawer1" title="发布通知" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="newnoticeModel" label-width="100px" >
                <el-form-item label="标题" >
                    <el-input v-model="newnoticeModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                
                
                <el-form-item label="通知内容">
                    <el-input v-model="newnoticeModel.content" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="请输入通知内容" />
                </el-form-item>
                <el-form-item>发布单位: 云南省</el-form-item>
                <el-form-item>
                    <el-button type="primary">发布</el-button>
                    <el-button type="info">取消</el-button>
                </el-form-item>
            </el-form>
    </el-drawer>

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

</style>