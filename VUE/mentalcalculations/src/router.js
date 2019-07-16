import Vue from 'vue'
import Router from 'vue-router'
import StartSection from './components/StartSection.vue'
import GameSection from './components/GameSection.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'StartSection',
      component: StartSection
    },
    {
      path: '/Game',
      name: 'GameSection',
      component: GameSection
    }
  ]
})
