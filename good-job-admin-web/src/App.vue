<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->

  <!-- <div :class="`header header-${theme}`"> -->
    <!-- 背景图 -->
    <!-- <img class="logo" src= "@/assets/logo.png"/> -->

    <!-- 解决getStyle的问题 -->
    <!-- <router-link to="/" :class="getStyle('home')">首页</router-link> -->
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于我</router-link>
    <router-link to="/login">登录</router-link>
  <!-- </div> -->

  <router-view/>
</template>

<script lang="ts">
import { provide, reactive } from 'vue'
import { MainParameter } from '@/models/mainParameter'

const mainParameter = reactive<MainParameter>({
  theme: 'light',
  currentSelect: 'home'
})

provide('mainParameter', mainParameter)
export default {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
