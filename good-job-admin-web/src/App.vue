<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import myHeader from '@/components/myHeader.vue'
import { reactive, provide, ref } from 'vue';
import type { MainParameter } from './models/mainParameter';
import store from '@/stores'

const mainParameter = reactive<MainParameter>({
  theme: 'light',
  currentSelect: 'home'
})

provide('mainParameter', mainParameter)
const height = ref<number>(document.documentElement.clientHeight)
const wight = ref<number>(document.documentElement.clientWidth)
window.addEventListener('resize', () => {
  height.value = document.documentElement.clientHeight
  wight.value = document.documentElement.clientWidth
})
</script>

<template>
  <myHeader v-show="store.state.isLoggedIn" style="{height: '50px', width: '100%', margin: 'auto'}"/>
  
  <div :style="{height: height - 50 + 'px', width: '100%', margin: 'auto'}">
    <RouterView />
  </div>
  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}


nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
