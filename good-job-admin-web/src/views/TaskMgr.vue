<script setup lang="ts">

import type { MainParameter } from '@/models/mainParameter'
import { inject, onMounted, ref } from 'vue'
import {  Search } from '@element-plus/icons-vue'

const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'light'
  mainParameter.currentSelect = 'taskMgr'
})

</script>

<template>
  <div class="taskMgr">

  </div>
</template>

<style scoped>

</style>
