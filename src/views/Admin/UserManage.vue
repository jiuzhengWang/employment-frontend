<script setup >
//用户管理页面
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

import {Plus} from '@element-plus/icons-vue'
import axios from 'axios';
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const newuser = ref({
    id: '',
    password1:'',
    password2:'',
    usertypeSelect:''
})

//通知列表数据模型
const user = ref([
    {
        "userId":"用户1",
        "usertype":"企业",
    },
    {
        "userId":"用户1",
        "usertype":"企业",
    },{
        "userId":"用户1",
        "usertype":"市",
    },
  
])





const options = [
  {
    value: '企业',
    label: '企业',
  },
  {
    value: '市',
    label: '市',
  },
  {
    value: '省',
    label: '省'
  }
]

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
                <span>用户管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true">创建用户</el-button>
                </div>
            </div>
        </template>
       
        <!-- 通知列表 -->
        <el-table :data="user" style="width: 100%">
            <el-table-column label="用户名" width="400" prop="userId" ></el-table-column>
            <el-table-column label="用户类型" prop="usertype"> </el-table-column>
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
    <el-drawer v-model="visibleDrawer" title="创建用户" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="newuser" label-width="100px">
                <el-form-item label="用户名" >
                    <el-input v-model="newuser.id" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input v-model="newuser.password1" type="password" placeholder="请输入密码" show-password/>
                </el-form-item>

                <el-form-item label="确认密码" >
                    <el-input v-model="newuser.password2" type="password" placeholder="请再次输入密码" show-password/>
                </el-form-item>
                
                <el-form-item label="用户类型">
                    <el-select v-model="newuser.usertypeSelect" class="m-2" placeholder="请选择用户类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                    
                    
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="
                    if (newuser.password1 != newuser.password2) {
                        console.log('两次输入的密码不一致！');
                        //alert('两次输入的密码不一致！');
                    } else {
                        let type = -1;
                        if(newuser.usertypeSelect=='企业'){
                            type = 0;
                        } else if(newuser.usertypeSelect=='市'){
                            type = 1;
                        } else {
                            type = 2;
                        }
                        axios({ method: 'POST',
                                url: 'http://localhost:8080/user/register',
                                data: {
                                    userId: newuser.id,
                                    password: newuser.password1,
                                    userType: type
                                }
                            }).then(response=>{
                                console.log(response);
                                if(response.data.data==true){
                                    //alert('注册成功！');
                                    
                                    console.log('注册成功！');
                                }
                                else{
                                    //alert('该用户已被注册！');
                                    console.log('该用户已经被注册！');
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                    }
                    ">创建</el-button>
                    <el-button type="info" @click="newuser.id='';newuser.password1='';newuser.password2='';newuser.usertypeSelect=''">取消</el-button>
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