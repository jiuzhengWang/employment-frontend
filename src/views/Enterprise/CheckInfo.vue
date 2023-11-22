<template>


  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>审核备案</span>
        <div class="extra">
          <el-button type="success" @click="">提交备案</el-button>
<!--          提交更改后的内容-->
          <!-- <el-button type="danger" @click="">取消</el-button> -->
<!--          还原更改，即从服务器获取一次数据覆盖做出的更改。-->
        </div>
      </div>
    </template>


    <el-descriptions
        class="margin-top"
        title="企业填报信息"
        :column="3"
        :size="size"
        border
    >

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user/>
            </el-icon>
            企业
          </div>
        </template>
        <el-input v-model="infodata.enterprise" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            性质
          </div>
        </template>
        <el-input v-model="infodata.nature" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location/>
            </el-icon>
            行业
          </div>
        </template>
        <el-input v-model="infodata.industry" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user/>
            </el-icon>
            市级
          </div>
        </template>
        <el-input v-model="infodata.city" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            联系人
          </div>
        </template>
        <el-input v-model="infodata.contact" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location/>
            </el-icon>
            电话
          </div>
        </template>
        <el-input v-model="infodata.phone" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user/>
            </el-icon>
            业务
          </div>
        </template>
        <el-input v-model="infodata.business" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            地址
          </div>
        </template>
        <el-input v-model="infodata.address" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location/>
            </el-icon>
            在职
          </div>
        </template>
        <el-input v-model="infodata.onjob" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            入职
          </div>
        </template>
        <el-input v-model="infodata.entry" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            离职
          </div>
        </template>
        <el-input v-model="infodata.leave" placeholder="Please input" clearable/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone/>
            </el-icon>
            性别比
          </div>
        </template>
        <el-input v-model="infodata.sexratio" placeholder="Please input" clearable/>
      </el-descriptions-item>


    </el-descriptions>

  </el-card>


</template>

<script setup lang="ts">
import {computed} from 'vue'
import {
  Iphone,
  Location,
  User,
} from '@element-plus/icons-vue'
import {ref} from 'vue'

const infodata = ref({
  enterprise: '无衣烦',
  nature: '私营',
  industry: '校园服务',
  city: '北京',
  contact: '吴谦',
  phone: '114514',
  business: '共享经济',
  address: '北京市朝阳区派出所',
  onjob: '114',
  entry: '51',
  leave: '4',
  sexratio: '1：0',
})
const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
});

//提供保存按钮的功能

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

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>
