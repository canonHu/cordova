// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  yoursMood: '逆着光行走，仍风吹雨打',
  detailContent: {},
  userInfo: {},
  loveList: [],
  detailState: {}
}

const mutations = {
  getUserInfo: (state) => {
    // 调用登录接口
    wx.login({
      success: () => {
        wx.getUserInfo({
          success: (res) => {
            state.userInfo = res.userInfo
          }
        })
      }
    })
  },
  getData: (state, action) => {
    wx.request({
      url: 'http://172.31.84.74:3000/' + action.url, // 仅为示例，并非真实的接口地址
      data: action.params,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (action.url === 'findData') {
          state.loveList = res.data
        }
        action.successFn(res.data)
      }
    })
  },
  toDateil: (state, action) => {
    console.log(action)
    state.detailState = action
  },
  remenberYours: (state, action) => {
    if (!/^[ ]+$/.test(action.yoursMood)) {
      state.yoursMood = action.yoursMood
    } else {
      state.yoursMood = '逆着光行走，仍风吹雨打'
    }
  },
  changeDetail: (state, action) => {
    state.detailContent = action.detailContent
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

const store = new Vuex.Store({state, mutations})

export default store
