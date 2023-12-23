<script setup lang="ts">

import type { MainParameter } from '@/models/mainParameter'
import UserStore from '@/stores/userStore';import { inject, onMounted } from 'vue'
import { useStore } from 'vuex';

const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'light'
  mainParameter.currentSelect = 'about'
})

const store = useStore()
console.log(store)


</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
