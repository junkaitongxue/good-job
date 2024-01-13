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
const startPageNo = ref(1)

let tableData = ref([])
const tatal = ref(0)

const rearch = async () => {
  const params = {
    'appname': appName.value, 
    'title': executerName.value,
    'start': (startPageNo.value -1) * (pageSize2.value),
    'length': pageSize2.value
  }
  const resp = await axios.post<IResponseData<ExecuterInfo>>("/jobgroup/pageList", {'params': params})
  // ref记得需要是.value才能生效！！！
  tableData.value = resp.data as any
  tatal.value = resp.recordsTotal as number
}

const newExecuter = async () => {
  const params = {
    'appname': newAppName.value, 
    'title': newName.value,
    'addressType': newRegisterWay.value,
    'addressList': newOnlineAddrs.value
  }
  const resp = await axios.post<IResponseData<Object>>("/jobgroup/save", {'params': params}) 
  resetParamForAdd()
  dialogVisible.value = false
  rearch()
}

const resetParamForAdd = () => {
  newAppName.value = ''
  newName.value = ''
  newRegisterWay.value = '0'
  newOnlineAddrs.value = ''
}

const deleteExecuter = async (id: number) => {
  // const id = tableData.value[index].id;
  const params = {
    'id': id
  }
  const resp = await axios.post<IResponseData<Object>>("/jobgroup/remove", {'params': params}) 
  console.log(resp)
  rearch()
}


const pageSize2 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  rearch()
}
const handleCurrentChange = (val: number) => {
  rearch()
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

const dialogVisible = ref(false)

const newAppName = ref('')
const newName = ref('')
const newRegisterWay = ref('0')
const newOnlineAddrs = ref('')
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
    <el-button size="large" type="success" id="newBtn" @click="dialogVisible = true">新增</el-button>
    <el-button size="large" type="primary" id="searchBtn" @click="rearch">搜索</el-button>
  </div>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="appname" label="AppName" width="650%" />
    <el-table-column prop="title" label="名称" width="250%" />
    <el-table-column prop="addressType" label="注册方式" width="250%" />
    <el-table-column prop="addressList" label="Online机器地址" width="250%" />
    <el-table-column fixed="right" label="Operations" width="250%">
      <template #default="scope" >
        <el-button link type="primary" size="small" @click="deleteExecuter(scope.row.id)"
          >删除</el-button
        >
        <el-button link text type="primary" size="small" @click="dialogFormVisible = true">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="新增执行器" width="30%" draggable>
    <div>
      <span>AppName*</span>
      <el-input
        v-model="newAppName"
        class="appNameInput"
        placeholder="请输入执行器名称"
        size="large"
      ></el-input>
    </div>
    <div>
      <span>名称*</span>
      <el-input
        v-model="newName"
        class="appNameInput"
        placeholder="请输入名称"
        size="large"
      ></el-input>
    </div>
    <div>
      <span>注册方式*</span>
      <el-radio-group v-model="newRegisterWay" class="ml-4">
      <el-radio label="0" size="large">自动注册</el-radio>
      <el-radio label="1" size="large">手动录入</el-radio>
      </el-radio-group>
    </div>
    <div>
      <span>机器地址*</span>
      <el-input
        v-model="newOnlineAddrs"
        type="textarea"
        rows="4"
        class="appNameInput"
        :disabled="newRegisterWay === '0'"
        placeholder="请输入执行器地址列表，多地址用逗号隔开"
        size="large"
      ></el-input>
    </div>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="newExecuter">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>

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
      v-model:current-page="startPageNo"
      v-model:page-size="pageSize2"
      :page-sizes="[10, 30, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next"
      :total="tatal"
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
