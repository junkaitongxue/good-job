<script setup lang="ts">

import type { MainParameter } from '@/models/mainParameter'
import { inject, onMounted } from 'vue'

const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'light'
  mainParameter.currentSelect = 'demo'
})
</script>

<template>
  <div class="demo">
    <h1>Demo 功能演示页面</h1>
    <a href="weixin://">WeiXin</a>
    <!-- 最好是检测自定义协议是否存在 -->
    <a href="hello://">hello</a>
  </div>
</template>
