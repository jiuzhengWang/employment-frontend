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
                <el-date-picker v-model="formInline.date" type="date" placeholder="请选择" clearable />
            </el-form-item>
            <el-form-item label="就业人数是否减少">
                <el-select v-model="formInline.number" placeholder="请选择" clearable>
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                </el-select>
            </el-form-item>
            <el-form-item label="减少类型">
                <el-select v-model="formInline.category" placeholder="请选择" clearable>
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
                <el-select v-model="formInline.reason" placeholder="请选择" clearable>
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
                <el-button type="primary" @click="search">筛选</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click="clear">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="showData" style="width: 100%" max-height="650"
            :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="date" label="调查期" sortable />
            <el-table-column prop="number" label="就业人数是否减少" />
            <el-table-column prop="category" label="减少类型" />
            <el-table-column prop="reason" label="主要原因" />
            <el-table-column fixed="right" label="查看" width="120">
                <template #default="{ row }">
                    <el-button link type="primary" :icon="Search" @click="Detail" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹窗 -->
        <el-dialog v-model="dialogVisible" title="数据详情" width="30%" :before-close="handleClose">
            <p>调查期：{{ detailData.date }}</p>
            <p>就业人数是否减少：{{ detailData.number }}</p>
            <p>减少类型：{{ detailData.category }}</p>
            <p>主要原因：{{ detailData.reason }}</p>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        下载
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 分页条 -->
        <el-pagination class="el-p" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[10, 15, 20]" :small="small" :disabled="disabled" :background="background"
            layout="jumper, total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
</template>

<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'


interface Data {
    date: string;
    number: string;
    category: string;
    reason: string;
}

//后端发送往期数据信息
const tableData = ref([
    { 'reportedDataId': 0, 'date': '2022-10-31', 'number': '是', 'category': '停业整顿', 'reason': '工资、社保等用工成本上升' },
    { 'reportedDataId': 1, 'date': '2022-08-31', 'number': '是', 'category': '重大事件影响', 'reason': '税收政策变化（包括税 负增加或出口退税减少等）' },
    { 'reportedDataId': 2, 'date': '2023-03-26', 'number': '是', 'category': '经济性裁员', 'reason': '产业结构调整' },
    { 'reportedDataId': 3, 'date': '2021-09-03', 'number': '是', 'category': '自然减员', 'reason': '原材料涨价' },
    { 'reportedDataId': 4, 'date': '2023-02-23', 'number': '是', 'category': '业务转移', 'reason': '自然减员' },
    { 'reportedDataId': 5, 'date': '2020-06-19', 'number': '是', 'category': '自然灾害', 'reason': '企业内部调剂' },
    { 'reportedDataId': 6, 'date': '2020-09-26', 'number': '是', 'category': '重大事件影响', 'reason': '其他' },
    { 'reportedDataId': 7, 'date': '2020-12-11', 'number': '是', 'category': '国际因素变化影响', 'reason': '产业结构调整' },
    { 'reportedDataId': 8, 'date': '2020-10-17', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '其他' },
    { 'reportedDataId': 9, 'date': '2021-01-01', 'number': '是', 'category': '停业整顿', 'reason': '企业内部调剂' },
    { 'reportedDataId': 10, 'date': '2023-02-16', 'number': '是', 'category': '停业整顿', 'reason': '自然减员' },
    { 'reportedDataId': 11, 'date': '2022-12-22', 'number': '是', 'category': '其他', 'reason': '重大技术改革' },
    { 'reportedDataId': 12, 'date': '2021-05-07', 'number': '是', 'category': '关闭破产', 'reason': '工资、社保等用工成本上升' },
    { 'reportedDataId': 13, 'date': '2021-04-05', 'number': '是', 'category': '经济性裁员', 'reason': '订单不足' },
    { 'reportedDataId': 14, 'date': '2022-03-20', 'number': '是', 'category': '自然灾害', 'reason': '季节性用工' },
    { 'reportedDataId': 15, 'date': '2021-04-29', 'number': '是', 'category': '业务转移', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 16, 'date': '2021-10-15', 'number': '是', 'category': '国际因素变化影响', 'reason': '自然减员' },
    { 'reportedDataId': 17, 'date': '2021-09-23', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '自然减员' },
    { 'reportedDataId': 18, 'date': '2021-05-26', 'number': '是', 'category': '其他', 'reason': '产业结构调整' },
    { 'reportedDataId': 19, 'date': '2022-12-15', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '工资、社保等用工成本上升' },
    { 'reportedDataId': 20, 'date': '2021-05-25', 'number': '是', 'category': '经济性裁员', 'reason': '重大技术改革' },
    { 'reportedDataId': 21, 'date': '2023-06-30', 'number': '是', 'category': '业务转移', 'reason': '原材料涨价' },
    { 'reportedDataId': 22, 'date': '2020-04-06', 'number': '是', 'category': '其他', 'reason': '产业结构调整' },
    { 'reportedDataId': 23, 'date': '2023-04-10', 'number': '是', 'category': '其他', 'reason': '重大技术改革' },
    { 'reportedDataId': 24, 'date': '2022-01-22', 'number': '是', 'category': '停业整顿', 'reason': '自然减员' },
    { 'reportedDataId': 25, 'date': '2020-03-19', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '重大技术改革' },
    { 'reportedDataId': 26, 'date': '2021-06-21', 'number': '是', 'category': '停业整顿', 'reason': '产业结构调整' },
    { 'reportedDataId': 27, 'date': '2023-03-20', 'number': '是', 'category': '自然灾害', 'reason': '淘汰落后产能' },
    { 'reportedDataId': 28, 'date': '2021-11-14', 'number': '是', 'category': '业务转移', 'reason': '经营资金困难' },
    { 'reportedDataId': 29, 'date': '2023-02-09', 'number': '是', 'category': '关闭破产', 'reason': '淘汰落后产能' },
    { 'reportedDataId': 30, 'date': '2023-02-02', 'number': '是', 'category': '关闭破产', 'reason': '工资、社保等用工成本上升' },
    { 'reportedDataId': 31, 'date': '2022-12-28', 'number': '是', 'category': '业务转移', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 32, 'date': '2020-04-15', 'number': '是', 'category': '业务转移', 'reason': '其他' },
    { 'reportedDataId': 33, 'date': '2022-03-12', 'number': '是', 'category': '停业整顿', 'reason': '劳务派遣' },
    { 'reportedDataId': 34, 'date': '2021-06-21', 'number': '是', 'category': '国际因素变化影响', 'reason': '重大技术改革' },
    { 'reportedDataId': 35, 'date': '2021-07-02', 'number': '是', 'category': '重大事件影响', 'reason': '节能减排' },
    { 'reportedDataId': 36, 'date': '2020-11-30', 'number': '是', 'category': '其他', 'reason': '产业结构调整' },
    { 'reportedDataId': 37, 'date': '2022-12-11', 'number': '是', 'category': '停业整顿', 'reason': '自然减员' },
    { 'reportedDataId': 38, 'date': '2021-06-02', 'number': '是', 'category': '国际因素变化影响', 'reason': '工作调动' },
    { 'reportedDataId': 39, 'date': '2023-03-09', 'number': '是', 'category': '重大事件影响', 'reason': '工作调动' },
    { 'reportedDataId': 40, 'date': '2021-08-29', 'number': '是', 'category': '停业整顿', 'reason': '劳动关系转移' },
    { 'reportedDataId': 41, 'date': '2021-05-11', 'number': '是', 'category': '关闭破产', 'reason': '劳动关系转移' },
    { 'reportedDataId': 42, 'date': '2020-12-22', 'number': '是', 'category': '自然灾害', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 43, 'date': '2021-07-24', 'number': '是', 'category': '自然灾害', 'reason': '工作调动' },
    { 'reportedDataId': 44, 'date': '2022-04-26', 'number': '是', 'category': '停业整顿', 'reason': '其他' },
    { 'reportedDataId': 45, 'date': '2020-04-30', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '自行离职' },
    { 'reportedDataId': 46, 'date': '2022-09-21', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '原材料涨价' },
    { 'reportedDataId': 47, 'date': '2020-03-30', 'number': '是', 'category': '关闭破产', 'reason': '淘汰落后产能' },
    { 'reportedDataId': 48, 'date': '2021-05-17', 'number': '是', 'category': '国际因素变化影响', 'reason': '工作调动' },
    { 'reportedDataId': 49, 'date': '2021-03-09', 'number': '是', 'category': '停业整顿', 'reason': '产业结构调整' },
    { 'reportedDataId': 50, 'date': '2020-02-27', 'number': '是', 'category': '正常解除或终止劳动合同', 'reason': '经营资金困难' },
    { 'reportedDataId': 51, 'date': '2021-09-04', 'number': '是', 'category': '自然减员', 'reason': '经营资金困难' },
    { 'reportedDataId': 52, 'date': '2021-02-24', 'number': '是', 'category': '国际因素变化影响', 'reason': '自然减员' },
    { 'reportedDataId': 53, 'date': '2022-06-15', 'number': '是', 'category': '自然减员', 'reason': '经营资金困难' },
    { 'reportedDataId': 54, 'date': '2020-04-08', 'number': '是', 'category': '业务转移', 'reason': '季节性用工' },
    { 'reportedDataId': 55, 'date': '2020-10-01', 'number': '是', 'category': '停业整顿', 'reason': '自然减员' },
    { 'reportedDataId': 56, 'date': '2023-02-12', 'number': '是', 'category': '停业整顿', 'reason': '节能减排' },
    { 'reportedDataId': 57, 'date': '2022-09-25', 'number': '是', 'category': '停业整顿', 'reason': '重大技术改革' },
    { 'reportedDataId': 58, 'date': '2020-07-30', 'number': '是', 'category': '关闭破产', 'reason': '产业结构调整' },
    { 'reportedDataId': 59, 'date': '2022-03-12', 'number': '是', 'category': '自然灾害', 'reason': '自然减员' },
    { 'reportedDataId': 60, 'date': '2020-10-02', 'number': '是', 'category': '停业整顿', 'reason': '节能减排' },
    { 'reportedDataId': 61, 'date': '2021-08-09', 'number': '是', 'category': '自然灾害', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 62, 'date': '2021-05-12', 'number': '是', 'category': '关闭破产', 'reason': '劳务派遣' },
    { 'reportedDataId': 63, 'date': '2021-10-07', 'number': '是', 'category': '业务转移', 'reason': '订单不足' },
    { 'reportedDataId': 64, 'date': '2020-09-26', 'number': '是', 'category': '自然灾害', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 65, 'date': '2020-03-22', 'number': '是', 'category': '其他', 'reason': '工作调动' },
    { 'reportedDataId': 66, 'date': '2020-05-12', 'number': '是', 'category': '业务转移', 'reason': '自然减员' },
    { 'reportedDataId': 67, 'date': '2020-04-22', 'number': '是', 'category': '重大事件影响', 'reason': '重大技术改革' },
    { 'reportedDataId': 68, 'date': '2023-07-27', 'number': '是', 'category': '业务转移', 'reason': '节能减排' },
    { 'reportedDataId': 69, 'date': '2023-09-15', 'number': '是', 'category': '停业整顿', 'reason': '订单不足' },
    { 'reportedDataId': 70, 'date': '2023-03-04', 'number': '是', 'category': '自然减员', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 71, 'date': '2023-08-14', 'number': '是', 'category': '其他', 'reason': '劳务派遣' },
    { 'reportedDataId': 72, 'date': '2022-03-09', 'number': '是', 'category': '自然减员', 'reason': '自行离职' },
    { 'reportedDataId': 73, 'date': '2022-08-05', 'number': '是', 'category': '关闭破产', 'reason': '劳动关系转移' },
    { 'reportedDataId': 74, 'date': '2020-05-11', 'number': '是', 'category': '其他', 'reason': '其他' },
    { 'reportedDataId': 75, 'date': '2022-02-05', 'number': '是', 'category': '国际因素变化影响', 'reason': '工作调动' },
    { 'reportedDataId': 76, 'date': '2022-02-26', 'number': '是', 'category': '经济性裁员', 'reason': '企业内部调剂' },
    { 'reportedDataId': 77, 'date': '2020-04-28', 'number': '是', 'category': '自然灾害', 'reason': '工作调动' },
    { 'reportedDataId': 78, 'date': '2023-05-05', 'number': '是', 'category': '重大事件影响', 'reason': '工资、社保等用工成本上升' },
    { 'reportedDataId': 79, 'date': '2021-01-30', 'number': '是', 'category': '停业整顿', 'reason': '劳务派遣' },
    { 'reportedDataId': 80, 'date': '2023-09-22', 'number': '是', 'category': '业务转移', 'reason': '自行离职' },
    { 'reportedDataId': 81, 'date': '2022-11-22', 'number': '是', 'category': '关闭破产', 'reason': '劳动关系转移' },
    { 'reportedDataId': 82, 'date': '2023-06-03', 'number': '是', 'category': '自然灾害', 'reason': '淘汰落后产能' },
    { 'reportedDataId': 83, 'date': '2021-04-09', 'number': '是', 'category': '业务转移', 'reason': '税收政策变化（包括税负增加或出口退税减少等）' },
    { 'reportedDataId': 84, 'date': '2021-06-12', 'number': '是', 'category': '重大事件影响', 'reason': '自行离职' },
    { 'reportedDataId': 85, 'date': '2021-04-01', 'number': '是', 'category': '自然减员', 'reason': '节能减排' },
    { 'reportedDataId': 86, 'date': '2020-03-06', 'number': '是', 'category': '国际因素变化影响', 'reason': '季节性用工' },
    { 'reportedDataId': 87, 'date': '2022-10-29', 'number': '是', 'category': '关闭破产', 'reason': '劳动关系转移' },
    { 'reportedDataId': 88, 'date': '2020-02-04', 'number': '是', 'category': '经济性裁员', 'reason': '工作调动' },
    { 'reportedDataId': 89, 'date': '2021-03-16', 'number': '是', 'category': '经济性裁员', 'reason': '重大技术改革' },
    { 'reportedDataId': 90, 'date': '2021-09-17', 'number': '是', 'category': '重大事件影响', 'reason': '节能减排' },
    { 'reportedDataId': 91, 'date': '2023-05-12', 'number': '是', 'category': '重大事件影响', 'reason': '劳动关系转移' },
    { 'reportedDataId': 92, 'date': '2022-11-07', 'number': '是', 'category': '自然灾害', 'reason': '经营资金困难' },
    { 'reportedDataId': 93, 'date': '2023-03-02', 'number': '是', 'category': '停业整顿', 'reason': '劳动关系转移' },
    { 'reportedDataId': 94, 'date': '2022-01-27', 'number': '是', 'category': '经济性裁员', 'reason': '季节性用工' },
    { 'reportedDataId': 95, 'date': '2022-05-06', 'number': '是', 'category': '停业整顿', 'reason': '工作调动' },
    { 'reportedDataId': 96, 'date': '2021-08-30', 'number': '是', 'category': '业务转移', 'reason': '其他' },
    { 'reportedDataId': 97, 'date': '2021-02-10', 'number': '是', 'category': '停业整顿', 'reason': '季节性用工' },
    { 'reportedDataId': 98, 'date': '2021-01-18', 'number': '是', 'category': '关闭破产', 'reason': '节能减排' },
    { 'reportedDataId': 99, 'date': '2021-04-24', 'number': '是', 'category': '自然减员', 'reason': '经营资金困难' },
])
const showData = ref<{ reportedDataId: number; date: string; number: string; category: string; reason: string; }[]>([]);
//处理分页相关操作

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(tableData.value.length)

// 更新分页数据
const updateFilteredData = () => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    showData.value = filteredData.value.slice(startIndex, endIndex);
    total.value = filteredData.value.length
}

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    currentPage.value = 1; // 重置到第一页
    updateFilteredData();
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    updateFilteredData();
}

//筛选框
import { } from 'vue'

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
    total.value = filteredData.value.length// 更新总条目数
    currentPage.value = 1; // 重置到第一页
    updateFilteredData(); // 更新显示数据
}

const clear = () => {
    console.log('clear!'),
        formInline.number = '',
        formInline.category = '',
        formInline.reason = '',
        formInline.date = '',
        currentPage.value = 1; // 重置到第一页
        filteredData.value = tableData.value
    updateFilteredData(); // 更新显示数据
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

const dialogVisible = ref(false)
const detailData = reactive({ date: '', number: '', category: '', reason: '' })

const Detail = (row: { date: string; number: string; category: string; reason: string; }) => {
    detailData.date = row.date;
    detailData.number = row.number;
    detailData.category = row.category;
    detailData.reason = row.reason;
    dialogVisible.value = true;
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
    }

onMounted(() => {
    filteredData.value = tableData.value
    updateFilteredData();
})


</script>

<style scoped>
.el-p {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.card-header {
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    font-weight: bold;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>