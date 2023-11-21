<template>
    <!-- 头部 -->
    <el-card class="box-card">
        <div class="card-header">
            <span>数据查询</span>
        </div>
        
        <div style="margin-top: 20px;">
            <hr>
        </div>

        <!-- 筛选框 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="调查期">
                <el-date-picker
                v-model="formInline.date"
                type="date"
                placeholder="请选择"
                clearable
                />
            </el-form-item>
            <el-form-item label="就业人数是否减少">
                    <el-select
                        v-model="formInline.number"
                        placeholder="请选择"
                        clearable
                        >
                        <el-option label="是" value="是" />
                        <el-option label="否" value="否" />
                    </el-select>
                </el-form-item>
            <el-form-item label="减少类型">
                <el-select
                    v-model="formInline.category"
                    placeholder="请选择"
                    clearable
                    >
                    <el-option label="关闭破产" value="关闭破产" />
                    <el-option label="停业整顿" value="停业整顿" />
                    <el-option label="经济性裁员" value="经济性裁员" />
                    <el-option label="业务转移" value="业务转移" />
                    <el-option label="自然减员" value="自然减员" />
                    <el-option label="正常解除或终止劳动合同" value="正常解除或终止劳动合同" />
                    <el-option label="国际因素变化影响" value="国际因素变化影响" />
                    <el-option label="自然灾害" value="自然灾害" />
                    <el-option label="重大事件影响" value="重大事件影响" />
                    <el-option label="其他" value="其他" />
                </el-select>
            </el-form-item>
            <el-form-item label="主要原因">
                <el-select
                    v-model="formInline.reason"
                    placeholder="请选择"
                    clearable
                    >
                    <el-option label="产业结构调整" value="产业结构调整" />
                    <el-option label="重大技术改革" value="重大技术改革" />
                    <el-option label="节能减排" value="节能减排" />
                    <el-option label="淘汰落后产能" value="淘汰落后产能" />
                    <el-option label="订单不足" value="订单不足" />
                    <el-option label="原材料涨价" value="原材料涨价" />
                    <el-option label="工资、社保等用工成本上升" value="工资、社保等用工成本上升" />
                    <el-option label="自然减员" value="自然减员" />
                    <el-option label="经营资金困难" value="经营资金困难" />
                    <el-option label="税收政策变化（包括税负增加或出口退税减少等）" value="税收政策变化（包括税负增加或出口退税减少等）" />
                    <el-option label="季节性用工" value="季节性用工" />
                    <el-option label="其他" value="其他" />
                    <el-option label="自行离职" value="自行离职" />
                    <el-option label="工作调动" value="工作调动" />
                    <el-option label="企业内部调剂" value="企业内部调剂" />
                    <el-option label="劳动关系转移" value="劳动关系转移" />
                    <el-option label="劳务派遣" value="劳务派遣" />
                </el-select>
            </el-form-item> &nbsp;
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click="clear">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="filteredData" style="width: 100%" max-height="650" :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="date" label="调查期" sortable/>
            <el-table-column 
                prop="number" 
                label="就业人数是否减少"
                :filters="[
                    { text: '是', value: '是' },
                    { text: '否', value: '否' }
                ]"
                :filter-method="filternumber"
            />
            <el-table-column 
                prop="category" 
                label="减少类型"
                :filters="[
                    { text: '关闭破产', value: '关闭破产' },
                    { text: '停业整顿', value: '停业整顿' },
                    { text: '经济性裁员', value: '经济性裁员' },
                    { text: '业务转移', value: '业务转移' },
                    { text: '自然减员', value: '自然减员' },
                    { text: '正常解除或终止劳动合同', value: '正常解除或终止劳动合同' },
                    { text: '国际因素变化影响', value: '国际因素变化影响' },
                    { text: '自然灾害', value: '自然灾害' },
                    { text: '重大事件影响', value: '重大事件影响' },
                    { text: '其他', value: '其他' }

                ]"
                :filter-method="filtercategory"
            />
            <el-table-column 
                prop="reason" 
                label="主要原因"
                :filters="[
                    { text: '产业结构调整', value: '产业结构调整' },
                    { text: '重大技术改革', value: '重大技术改革' },
                    { text: '节能减排', value: '节能减排' },
                    { text: '淘汰落后产能', value: '淘汰落后产能' },
                    { text: '订单不足', value: '订单不足' },
                    { text: '原材料涨价', value: '原材料涨价' },
                    { text: '工资、社保等用工成本上升', value: '工资、社保等用工成本上升' },
                    { text: '自然减员', value: '自然减员' },
                    { text: '经营资金困难', value: '经营资金困难' },
                    { text: '税收政策变化（包括税负增加或出口退税减少等）', value: '税收政策变化（包括税负增加或出口退税减少等）' },
                    { text: '季节性用工', value: '季节性用工' },
                    { text: '其他', value: '其他' },
                    { text: '自行离职', value: '自行离职' },
                    { text: '工作调动', value: '工作调动' },
                    { text: '企业内部调剂', value: '企业内部调剂' },
                    { text: '劳动关系转移', value: '劳动关系转移' },
                    { text: '劳务派遣', value: '劳务派遣' }
                ]"
                :filter-method="filterreason"
            />
            <el-table-column fixed="right" label="查看" width="120">
                <template #default>
                    <el-button link type="primary" :icon="Search" @click="Detail"/>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页条 -->
        <el-pagination
        class="el-p"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="jumper, total, sizes, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
    </el-card>

</template>

<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'


const Detail = () => {
    console.log('click')
    //跳转显示该数据详情页面，后端发送相关数据
}

interface Data {
    date: string;
    number: string;
    category: string;
    reason: string;
}

//后端发送往期数据信息
const tableData = ref([
    {
        reportedDataId: 0,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 1,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 2,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 3,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 4,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 5,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 6,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 7,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 8,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
    {
        reportedDataId: 9,
        date: 'sample',
        number: 'sample',
        category: 'sample',
        reason: 'sample',
    },
])

//处理分页相关操作

const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(0)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

//筛选框
import {  } from 'vue'

const formInline = reactive({
    number: '',
    category: '',
    reason: '',
    date: '',
})

const filteredData = ref<{ reportedDataId: number; date: string; number: string; category: string; reason: string; }[]>([]);
const search = () => {
    console.log('submit!')
    filteredData.value = tableData.value.filter(item => {
        return (
            (item.number === formInline.number || formInline.number === '') &&
            (item.category === formInline.category || formInline.category === '') &&
            (item.reason === formInline.reason || formInline.reason === '') &&
            (item.date === formInline.date || formInline.date === '')
        )
    })
    total.value = filteredData.value.length
}

const clear = () => {
    console.log('clear!'),
    formInline.number = '',
    formInline.category = '',
    formInline.reason = '',
    formInline.date = '',
    filteredData.value = tableData.value
    total.value = filteredData.value.length
}

const filternumber = (value: string, row: Data) => {
    return row.number === value
}
const filtercategory = (value: string, row: Data) => {
    return row.category === value
}
const filterreason = (value: string, row: Data) => {
    return row.reason === value
}

onMounted(() => {
    filteredData.value = tableData.value
    total.value = filteredData.value.length
})


</script>

<style scoped>
    .el-p{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

    .card-header{
        display: flex;
        justify-content: space-between;
        font-size: 40px;
        font-weight: bold;
    }
</style>