

<script lang="ts" setup>
import type { MainParameter } from '@/models/mainParameter'
import AuthUtils from '@/utils/AuthUtils';
import { inject, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from '@/router';

const mainParameter = inject('mainParameter') as MainParameter
const theme = ref(mainParameter.theme)
const getStyle = (key: string): string => {
  return mainParameter.currentSelect === key ? `menu menu-${theme.value} selected` : `menu menu-${theme.value}`
}
const logout = () => {
  router.push('/login')
  AuthUtils.logout()
}

watch(() => mainParameter.theme, (value) => {
  theme.value = value
})

const visible = ref(false)
</script>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="`header header-${theme}`">
    <span class="logo"><b>Good</b>-Job</span>
    <div class="routerMenu" >
      <router-link to="/" :class="getStyle('home')">首页</router-link>
      <router-link to="/executerMgr" :class="getStyle('executerMgr')">执行器管理</router-link>
      <router-link to="/taskMgr" :class="getStyle('taskMgr')">任务管理</router-link>
      <router-link to="/about" :class="getStyle('about')">使用教程</router-link>
    </div>

    <div class="logout">
      <el-popover title="Admin">
        <el-divider />
        <!-- <div > -->
          <el-button size="large" style="margin-top: 5px;margin-left: 12px; width: 90px;" type="primary" @click="logout">修改密码</el-button>
          <el-button size="large" style="margin-top: 5px; width: 90px;" type="primary" @click="logout">注销</el-button>
        <!-- </div> -->
        <template #reference>
          <el-avatar class="logout"> A </el-avatar>
        </template>
      </el-popover>
    </div>


  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 40px;
  display: flex;
  align-items: center;
}
.header-light {
  background: transparent;
}
.header-dark {
  background: #e77d0b;
}

.routerMenu {
  font-size: 12px;
  text-align: center;
}

.logo {
  font-size: 24px;
  color: #42b983;
  margin: 0px 15px;
}

.menu {
  color: #fff;
  text-decoration: none;
  padding: 0 20px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  margin: 0px 40px;
}

.menu-light {
  color: #98A9D1;
}

.menu-dark {
  color: #ffffffa6;
}

.menu:hover {
  background: #414f64;
  color: #f2f2f2;
}

.logout {
  margin: 0 1px 0px auto;
}

</style>
