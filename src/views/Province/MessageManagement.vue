<script setup>
//import axios from 'axios';
//发布通知页面
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

import {Plus} from '@element-plus/icons-vue'
import axios from 'axios';
//控制抽屉是否显示
const visibleDrawer1 = ref(false)
//添加表单数据模型
const newnoticeModel = ref({
    id: '',
    title: '',
    content:'',
    state:'',
    date: ''
    
})



//通知列表数据模型
const notice = ref([
    {
        "id":"1",
        "title":"标题1",
        "date":"2023-11-11 12:00:00",
        "content":"请各单位尽快上报数据"
    },
    {
        "id":"2",
        "title":"标题1",
        "date":"2023-11-11 12:00:00",
        "content":"456"
    },
    {
        "id":"3",
        "title":"标题1",
        "date":"2023-11-11 12:00:00",
        "content":"789"
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

//notice 和 noticeResponsed 到底什么区别？怎么才能够显示noticeResponsed?





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
        <el-table :data="noticeResponsed" style="width: 100%">
            <el-table-column label="标题" width="400" prop="title" ></el-table-column>
            <el-table-column label="发布时间" prop="date"> </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <!-- <el-button :icon="Edit" circle plain type="primary" > </el-button> -->
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
                    <el-button type="primary" @click="
                    axios({
                        method: 'POST',
                        url: 'http://localhost:8080/province/publish-notice/Yunnan',
                        data: newnoticeModel
                    }).then(response => {
                        console.log(JSON.stringify(response.data));
                        //弹出一个发布数据成功的提示
                    }).catch(err => {
                        alert(err);
                    });
                    
                    ">发布</el-button>
                    <el-button type="info" @click="
                        newnoticeModel.content='';
                        newnoticeModel.title='';
                        newnoticeModel.state='';
                        newnoticeModel.date='';
                    
                    ">重置</el-button>
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