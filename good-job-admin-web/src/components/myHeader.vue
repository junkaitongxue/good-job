

<script lang="ts" setup>
import type { MainParameter } from '@/models/mainParameter'
import { inject, ref, watch } from 'vue'

const mainParameter = inject('mainParameter') as MainParameter
const theme = ref(mainParameter.theme)
const getStyle = (key: string): string => {
  return mainParameter.currentSelect === key ? `menu menu-${theme.value} selected` : `menu menu-${theme.value}`
}

watch(() => mainParameter.theme, (value) => {
  theme.value = value
})

</script>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="`header header-${theme}`">
    <span class="logo">Good-Job</span>
    <router-link to="/" :class="getStyle('home')">首页</router-link>
    <router-link to="/about" :class="getStyle('about')">关于</router-link>
    <router-link to="/login" :class="getStyle('login')">登录</router-link>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 50px;
  display: flex;
  align-items: center;
}
.header-light {
  background: transparent;
}
.header-dark {
  background: #e77d0b;
}

.logo {
  color: #42b983;
  margin: 0px 15px;
}

.menu {
  color: #fff;
  text-decoration: none;
  padding: 0 20px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  margin: 0px 50px;
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


</style>
