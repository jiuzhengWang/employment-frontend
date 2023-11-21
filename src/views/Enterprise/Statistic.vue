<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>数据汇总</span>
        <div class="extra">
          <el-button type="primary" @click="">导出</el-button>
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="statisticdata.onjob">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                就业人数
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one day"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>相较上个月</span>
              <span class="green">
              24%
              <el-icon>
                <CaretTop/>
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="statisticdata.entry">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                新入职人数
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one month"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>相较上个月</span>
              <span class="red">
              12%
              <el-icon>
                <CaretBottom/>
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="statisticdata.leave" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                离职人数
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>相较上个月</span>
              <span class="green">
              16%
              <el-icon>
                <CaretTop/>
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>


</template>

<script lang="ts" setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop, Check, Close, Plus, Search,
  Warning,
} from '@element-plus/icons-vue'

import {ref} from 'vue'

const statisticdata = ref({
  onjob: '114',
  entry: '51',
  leave: '4',
})
</script>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>
