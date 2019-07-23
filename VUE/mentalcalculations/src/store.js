import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    getTask: state => token => {
      return state.tasks.find((element) => {
        if (element.gametoken === token) return element;
        return undefined;
      });
    }
  },
  mutations: {
    init(state, value) {
      state.tasks = value;
    },
    addTask(state, value) {
      state.tasks.push(value);
      try {
        const serializedState = JSON.stringify(state.tasks);
        window.localStorage.setItem('mentalcalculations', serializedState);
      } catch (err) {
        // Ignore errors
      }
    },
    updateTask(state, value) {
      const index = state.tasks.findIndex((element) => {
        if (element.gametoken === value.gametoken) return true;
        return false;
      });

      if (index >= 0) {
        state.tasks[index] = value;
        try {
          const serializedState = JSON.stringify(state.tasks);
          window.localStorage.setItem('mentalcalculations', serializedState);
        } catch (err) {
          // Ignore errors
        }
      }
    }
  },
  actions: {

  }
})
