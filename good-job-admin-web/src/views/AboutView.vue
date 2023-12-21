<script setup lang="ts">

import type { MainParameter } from '@/models/mainParameter'
import { inject, onMounted } from 'vue'

const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'light'
  mainParameter.currentSelect = 'about'
})

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
