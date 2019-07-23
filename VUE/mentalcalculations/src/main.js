import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const localStorageKey = 'mentalcalculations'

new Vue({
  router,
  store,
  mounted() {
    if (window.localStorage.getItem(localStorageKey)) {
      try{
        this.$store.commit('init', JSON.parse(window.localStorage.getItem(localStorageKey)));
      }
      catch(e) {
        window.localStorage.removeItem(localStorageKey);
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
