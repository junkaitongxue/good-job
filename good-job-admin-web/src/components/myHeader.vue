<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header header-dark">
    <span>Good-Job</span>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/login">登录</router-link>
  </div>
</template>

<script lang="ts">
import type { MainParameter } from '@/models/mainParameter'
import { inject, ref, watch } from 'vue'
import { Vue } from 'vue-class-component'

// const mainParameter = inject('mainParameter') as MainParameter
// const theme = ref(mainParameter.theme)
// const getStyle = (key: string): string => {
//   return mainParameter.currentSelect === key ? `munu menu-${theme.value} selected` : `menu munu-${theme.value}`
// }

// watch(() => mainParameter.theme, (value) => {
//   theme.value = value
// })

export default class myHeader extends Vue {}
</script>

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
</style>
