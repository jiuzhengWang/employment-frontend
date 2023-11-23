<script setup>
//查看通知页面
import {
    Edit,
    Check,
    Search

} from '@element-plus/icons-vue'

import { ref } from 'vue'

import {Plus} from '@element-plus/icons-vue'

import axios from "axios"

const visibleDrawer1 = ref(false)

const newnoticeModel = ref({
})

//通知列表数据模型
const messages = ref([
    {
        "title": "雨季来临",
        "released_time":"2023-11-11 12:00:00",
        "content": "下雨啦！！！"      
    },
    {
        "title": "旱季来临",
        "released_time":"2023-11-11 12:00:00",
        "content": "出太阳啦！"        
    }
  
])

//向后端请求所有通知
const noticeResponsed = ref([]);
axios({
    method: 'GET',
    url: 'http://localhost:8080/province/show-all-notice'
}).then(response => {
    //console.log(JSON.stringify(response.data));
    console.log(response.data.data[0]);
    noticeResponsed.value = response.data.data;
}).catch(err => {
    alert(err);
});

//
// axios({
//     method: 'GET',
//     url: 'http://localhost:8080/enterprise/notice/search',
//     data: ''
// }).then(response => {

// }).catch(err => {
//     alert(err);
// });






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
                <span>消息中心</span>
                <!-- <div class="extra">
                    <el-button type="primary" >新增调查期</el-button>
                </div> -->
            </div>
        </template>
       
        <!-- 通知列表 -->
        <el-table :data="noticeResponsed" style="width: 100%">
            <el-table-column label="标题"  prop="title" ></el-table-column>
            <el-table-column label="发布时间"  prop="released_time" ></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <!-- 显示具体通知 -->
                    <el-button :icon="Search"  type="primary" @click="
                    visibleDrawer1 = true;
                    //console.log(row);
                    
                    newnoticeModel = row;
                    
                    
                    
                    
                    
                    "> 详细信息 </el-button>
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

    <el-drawer v-model="visibleDrawer1" title="详细信息" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="newnoticeModel" label-width="100px" >
                <el-form-item label="标题" >
                    <el-input v-model="newnoticeModel.title" disabled></el-input>
                </el-form-item>
                
                <el-form-item label="通知内容">
                    <el-input v-model="newnoticeModel.content" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" disabled />
                </el-form-item>
                <!-- <el-form-item>发布单位: 云南省</el-form-item> -->
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