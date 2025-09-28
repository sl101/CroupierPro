<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiplicationView from './views/MultiplicationView.vue'
import Roulet from './views/Roulet.vue'
import NotFound from './views/NotFound.vue'

const routes = {
  //'/': Home,
	'/count': MultiplicationView,
  '/roulet': Roulet
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/count">Count</a> |
  <a href="#/roulet">Roulet</a>
  <component :is="currentView" />
</template>	

<style scoped></style>
