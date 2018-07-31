<template>
  <div class="container">
    <div class="userinfo">
      <img 
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input
        type="text"
        maxlength="15"
        v-model="motto"
        class="form-control"
        placeholder="此刻的想法/心情"
      />
    </form>
    <div @click="toList" class="counter">看得见的时候</div>
  </div>
</template>

<script>
import store from '../../store'
import card from '@/components/card'

export default {
  data () {
    return {
      motto: '',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    toList () {
      if (!this.motto) {
        wx.showToast({
          title: '请填写此刻的心情',
          icon: 'none',
          duration: 2000
        })
        return
      }
      store.commit('remenberYours', { yoursMood: this.motto })
      const url = '../pics/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
    // clickHandle (msg, ev) {
    //   console.log('clickHandle:', msg, ev)
    // }
  },

  watch: {
    motto (newValue, oldValue) {
      if (newValue.length === 15) {
        wx.showToast({
          title: '不能超过15个字',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.user-motto {
  min-height: 50px;
  text-align: center;
}

.form-control {
  display: block;
  font-size: 14px;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  width: 50%;
  font-size: 14px;
  margin: 10px auto;
  padding: 5px 10px;
  text-align: center;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
