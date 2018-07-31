// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    yoursMood: '逆着光行走，仍风吹雨打'
  },
  mutations: {
    remenberYours: (state, action) => {
      if (!/^[ ]+$/.test(action.yoursMood)) {
        state.yoursMood = action.yoursMood
      } else {
        state.yoursMood = '逆着光行走，仍风吹雨打'
      }
    },
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store
