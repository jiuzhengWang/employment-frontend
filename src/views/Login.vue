<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import axios from 'axios';
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})



//自定义确认密码的校验函数
const rePasswordValid = (rule, value, callback) => {
    if (value == null || value === '') {
        return callback(new Error('请再次确认密码'))
    }
    if (registerData.value.password !== value) {
        return callback(new Error('两次输入密码不一致'))
    }
}
//用于注册的表单校验模型
// const registerDataRules = ref({
//     username: [
//         { required: true, message: '请输入用户名', trigger: 'blur' },
//         { min: 5, max: 16, message: '用户名的长度必须为5~16位', trigger: 'blur' }
//     ],
//     password: [
//         { required: true, message: '请输入密码', trigger: 'blur' },
//         { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
//     ],
//     rePassword: [
//         { validator: rePasswordValid, trigger: 'blur' }
//     ]
// })
import {useRouter} from 'vue-router'
const router = useRouter()
const login = async() => {

    
    axios({
        method: 'POST',
        url: 'http://localhost:8080/user/login',
        data: {
            userId: registerData.value.username,
            password: registerData.value.password
        }
    }).then(response=>{
        console.log(response.data.data);
        response.data.data.userId
        //企业用户
        if(response.data.data.userType == 0){
            //TODO
        }
        //市用户
        else if(response.data.data.userType == 1) {
            //TODO
        }
        //省用户
        else {
            //TODO
        }



    }).catch(err => {
        alert(err);
    });



    if(registerData.value.username[0]=='E'){
        router.push('/enterprise')
        console.log(registerData.username)
    }
    else if(registerData.value.username[0]=='P'){
        router.push('/province')
    }
    else{
        router.push('/admin')
    }
        
}

const clearRegisterData = ()=>{
    registerData.value={
        username:'',
        password:'',
        rePassword:''
    }
}

const rules = {
    username:[
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min:5, max: 16, message:'长度为5~16位非空字符', trigger:'blur'}
    ],
    password:[
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min:5, max: 16, message:'长度为5~16位非空字符', trigger:'blur'}
    ],
    rePassword:[
        {validator: rePasswordValid, trigger:'blur'}
    ]
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space>
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: //url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_pic.jpeg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>