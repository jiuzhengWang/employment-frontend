<template>
    <!-- 头部 -->
    <el-card class="box-card">
        <div class="card-header">
            <span>数据填报</span>
        </div>
        <div>
            <!-- 后端传入 -->
            调查期：{{ time.toLocaleDateString() }}
        </div>

        <div style="margin-top: 20px;">
            <hr>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="建档期就业人数" prop="employedNumDuringFilingPeriod">
                <el-input v-model="ruleForm.employedNumDuringFilingPeriod" disabled style="width: 220px;"/>
            </el-form-item>
            <el-form-item label="调查期就业人数" prop="employedNumDuringSurveyPeriod">
                <el-input v-model="ruleForm.employedNumDuringSurveyPeriod" placeholder="请输入" clearable style="width: 220px;"/>
            </el-form-item>
            <el-form-item label="就业人数减少类型"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="reducedType">
                <el-select v-model="ruleForm.reducedType" placeholder="请选择">
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
            <el-form-item label="主要原因"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="mainReason">
                <el-select v-model="ruleForm.mainReason" placeholder="请选择">
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
            </el-form-item>
            <el-form-item label="主要原因说明"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="mainReasonDescription">
                <el-input v-model="ruleForm.mainReasonDescription" placeholder="请输入" clearable autosize type="textarea" style="width: 320px;"/>
            </el-form-item>
            <el-form-item label="次要原因"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="secondaryReason">
                <el-select v-model="ruleForm.secondaryReason" placeholder="请选择">
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
            </el-form-item>
            <el-form-item label="次要原因说明"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="secondaryReasonDescription">
                <el-input v-model="ruleForm.secondaryReasonDescription" placeholder="请输入" clearable autosize
                    type="textarea" style="width: 320px;"/>
            </el-form-item>
            <el-form-item label="第三原因"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="thirdReason">
                <el-select v-model="ruleForm.thirdReason" placeholder="请选择">
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
            </el-form-item>
            <el-form-item label="第三原因说明"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="thirdReasonDescription">
                <el-input v-model="ruleForm.thirdReasonDescription" placeholder="请输入" clearable autosize type="textarea" style="width: 320px;"/>
            </el-form-item>
            <el-form-item label="其他原因"
                v-if="ruleForm.employedNumDuringSurveyPeriod != null && ruleForm.employedNumDuringFilingPeriod > ruleForm.employedNumDuringSurveyPeriod"
                prop="otherReasons">
                <el-input v-model="ruleForm.otherReasons" placeholder="请输入" clearable autosize type="textarea" style="width: 320px;"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">上传</el-button>
                <el-button @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const time = ref(new Date())

interface RuleForm {
    employedNumDuringFilingPeriod: number,
    employedNumDuringSurveyPeriod: number | null,
    reducedType: string,
    mainReason: string,
    mainReasonDescription: string,
    secondaryReason: string,
    secondaryReasonDescription: string,
    thirdReason: string,
    thirdReasonDescription: string,
    otherReasons: string,
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    employedNumDuringFilingPeriod: 10000,
    employedNumDuringSurveyPeriod: null,
    reducedType: '',
    mainReason: '',
    mainReasonDescription: '',
    secondaryReason: '',
    secondaryReasonDescription: '',
    thirdReason: '',
    thirdReasonDescription: '',
    otherReasons: '',
})

const rules = reactive<FormRules<RuleForm>>({
    employedNumDuringFilingPeriod: [
        { required: true, message: '请输入建档期就业人数', trigger: 'blur' },
    ],
    employedNumDuringSurveyPeriod: [
        { required: true, message: '请输入调查期就业人数', trigger: 'blur' },
    ],
    reducedType: [
        { required: true, message: '请选择就业人数减少类型', trigger: 'change' },
    ],
    mainReason: [
        { required: true, message: '请选择主要原因', trigger: 'change' },
    ],
    mainReasonDescription: [
        { required: true, message: '请输入主要原因说明', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const save = () => {
    console.log('save!')
}

</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    font-weight: bold;
}</style>