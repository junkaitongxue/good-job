<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import type { MainParameter } from '@/models/mainParameter'
import { inject, onMounted } from 'vue'

const mainParameter = inject('mainParameter') as MainParameter
onMounted(() => {
  mainParameter.theme = 'dark'
  mainParameter.currentSelect = 'home'
})


</script>
