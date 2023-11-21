<script setup>
    import {ref,onMounted} from 'vue'
    //声明响应式数据 响应式对象有一个内部属性
    const count = ref(0);

    //声明函数
    function increment(){
        count.value++;
    }

    //声明钩子函数
    onMounted(()=>{
        console.log('挂载完毕！')
    });

</script>


<template>
<!-- 写html元素 -->
    <button @click="increment">count: {{ count }}</button>
</template>