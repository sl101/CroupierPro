//import { createRouter, createWebHistory } from 'vue-router'

//const router = createRouter({
//  history: createWebHistory(import.meta.env.BASE_URL),
//  routes: [],
//})

//export default router


import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/multiplication',
      name: 'Multiplication',
      component: () => import('../views/MultiplicationView.vue')
    },
    {
      path: '/roulette/neighbors',
      name: 'RouletteNeighbors',
      component: () => import('../views/RouletteNeighborsView.vue')
    },
    {
      path: '/results/:id',
      name: 'Results',
      component: () => import('../views/ResultsView.vue')
    }
  ]
});

export default router;