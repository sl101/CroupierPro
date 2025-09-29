<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiplicationView from './views/MultiplicationView.vue'
import Home from './views/Home.vue'
import Roulet from './views/Roulet.vue'
import NotFound from './views/NotFound.vue'
import './styles/style.css'

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
	<div class="app">
		<div class="container">
			<div class="wrapper">

				<div>
					<a href="#/count">Count</a> |
					<a href="#/roulet">Roulet</a>
				</div>
				<component :is="currentView" />
			</div>
		</div>
	</div>
</template>	

<style scoped>
	.app{
		width: 100%;
		height: 100%;
	}
	.wrapper{
		width: 100%;
		height: 100%;
		padding: 40px 0;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
</style>
