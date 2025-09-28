<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiplicationView from './views/MultiplicationView.vue'
import Home from './views/Home.vue'
import Roulet from './views/Roulet.vue'
import NotFound from './views/NotFound.vue'

const routes = {
  '/': Home,
	'/count': MultiplicationView,
  '/roulet': Roulet
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  const path = currentPath.value.slice(1) || '/'
  return (routes as any)[path] || NotFound
})
</script>

<template>
  <a href="#/count">Count</a> |
  <a href="#/roulet">Roulet</a>
  <component :is="currentView" />
</template>	

<style scoped></style>
