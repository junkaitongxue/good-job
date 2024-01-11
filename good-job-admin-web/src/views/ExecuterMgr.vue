<script setup lang="ts">

import type { MainParameter } from '@/models/mainParameter'
import { inject, onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios, { type IResponseData } from '@/utils/axios';
import type { ExecuterInfo } from '@/models/executerInfo';


const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'light'
  mainParameter.currentSelect = 'executerMgr'
  rearch()
})
const appName = ref('')
const executerName = ref('')

const handleClick = () => {
  console.log('click')
}

let tableData = ref([])

const rearch = async () => {
  const resp = await axios.post<IResponseData<ExecuterInfo[]>>("/jobgroup/pageList", {})
  // ref记得需要是.value才能生效！！！
  tableData.value = resp.data as any
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

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>

<template>
  <div class="executerMgr">
    <h1>执行器管理</h1>
    <span class="input-group-addon">AppName</span>
    <el-input
        v-model="appName"
        class="appNameInput"
        placeholder="请输入App Name"
        :prefix-icon="Search"
        size="large"
      />
    <span class="input-group-addon">名称</span>
    <el-input
        v-model="executerName"
        class="appNameInput"
        placeholder="请输入执行器名称"
        :prefix-icon="Search"
        size="large"
      />
    <el-button size="large" type="success" id="newBtn">新增</el-button>
    <el-button size="large" type="primary" id="searchBtn" @click="rearch">搜索</el-button>
  </div>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="appname" label="AppName" width="650%" />
    <el-table-column prop="title" label="名称" width="250%" />
    <el-table-column prop="addressType" label="注册方式" width="250%" />
    <el-table-column prop="addressList" label="Online机器地址" width="250%" />
    <el-table-column fixed="right" label="Operations" width="250%">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >删除</el-button
        >
        <el-button link text type="primary" size="small" @click="dialogFormVisible = true">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-pagination
      v-model:current-page="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
