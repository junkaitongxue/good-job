<script setup lang="ts">

import type { MainParameter } from '@/models/mainParameter'
import { inject, onMounted, ref } from 'vue'
import {  Search } from '@element-plus/icons-vue'
import axios from 'axios';
import type { ExecuterInfo } from '@/models/executerInfo';
import type { IResponseData } from '@/utils/axios';

const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'light'
  mainParameter.currentSelect = 'taskMgr'
})

const executerName = ref('')
const value = ref('all')
const desc = ref('')
const jobHander = ref('')
const owner = ref('')

const options = [
  {
    value: 'all',
    label: '全部',
  },
  {
    value: 'stop',
    label: '停止',
  },
  {
    value: 'active',
    label: '启动',
  }
]

var tableData = ref([])

const reach = async () => {
  const resp = await axios.post<IResponseData<ExecuterInfo[]>>("/jobgroup/pageList", {})
  debugger
  tableData = resp.data
}

// [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036',
//     tag: 'Home',
//   }
// ]

const handleClick = () => {
  console.log('click')
}

const currentPage2 = ref(5)
const pageSize2 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

</script>

<template>
  <div class="taskMgr">
    <h1>任务管理</h1>
    <span class="input-group-addon">执行器</span>
    <el-input
        v-model="executerName"
        class="appNameInput"
        placeholder="请选择执行器"
        :prefix-icon="Search"
        size="large"
      />
      <el-select
        v-model="value"
        class="m-2"
        placeholder="Select"
        size="large"
        style="width: 240px"
      >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

    <el-input
        v-model="desc"
        class="appNameInput"
        placeholder="请输入场景描述"
        size="large"
      />
    <el-input
        v-model="jobHander"
        class="appNameInput"
        placeholder="请输入jobHander"
        size="large"
      />
    <el-input
        v-model="owner"
        class="appNameInput"
        placeholder="请输入负责人"
        size="large"
      />
    <el-button size="large" type="success" id="newBtn">新增</el-button>
    <el-button size="large" type="primary" id="searchBtn">搜索</el-button>


    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      v-model:current-page="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
  
</template>

<style scoped>
.appNameInput{
  width: 300px;
}

#searchBtn {
  float: right;
  margin-left: 10px;
}

#newBtn {
  float: right;
  margin-left: 10px;
}

</style>
