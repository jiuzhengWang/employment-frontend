<!-- <script>
  //写数据
  export default{
    data(){
      return{
        msg:'shanghai'
      }
    }
  }
</script> -->
<script setup>

  // import LoginVue from '@/views/Login.vue'
  // import LayoutVue from './views/Layout.vue';
  

  import {ref} from 'vue';
  //调用ref函数，定义响应式数据
  const msg = ref('长沙')


  //导入Api.vue文件
  //import ApiVue from './Api.vue'

</script>

<template>
  <!-- <h1>北京</h1>
  <h1>{{ msg }}</h1> -->

  <!-- <ApiVue/> -->
  <!-- <CheckInfo/>
  <EnterpriseInfo/> -->
  <!-- <LoginVue/> -->
  <router-view></router-view>
</template>

<style scoped>
  h1{
    color: red;
  }
</style>
