<template>
  <div class="container">
    <!-- 分享海报 -->
    <div v-if="showQRCode" class="share-back">
      <canvas canvas-id="share-canvas" style="width: 375px; height: 667px;"/>
    </div>

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
import shareUtil from '../../utils/shareUtil.js'
import uploadUtil from '../../utils/uploadUtil.js'
import card from '@/components/card'

export default {
  data () {
    return {
      motto: '',
      showQRCode: false,
      disable: true,
      shareParams: {
        cardImg: 'http://m.tuniucdn.com/fb2/t1/G5/M00/51/94/Cii-slu8HBKIEJYhAAGkt2rrOMwAAO0BgP4Jl4AAaTP322.png',
        backImg: 'https://m1.tuniucdn.com/fb2/t1/G5/M00/52/64/Cii-tFu8clmIW58_AALJZ2cVCR8AAO1cwJQb34AAsl_76.jpeg',
        headImg: 'http://pic.cdhdky.com/download/20170523_140903561.jpg'
      }
    }
  },

  components: {
    card
  },

  methods: {
    toList () {
      this.showQRCodeImage()
      if (!this.motto) {
        wx.showToast({
          title: '请填写此刻的心情',
          icon: 'none',
          duration: 2000
        })
        return
      }
      store.commit('remenberYours', { yoursMood: this.motto })
      if (this.disable) {
        this.disable = false
        const url = '../pics/main'
        wx.navigateTo({ url })
      }
    },

    showQRCodeImage () {
      wx.showLoading({
        title: '图片生成中...'
      })
      this.showQRCode = true
      this.requestAllPhotoData()
        .then((result) => {
          let backImg = result[0].imgUrl !== undefined ? result[0].imgUrl : ''
          let headImg = result[1].imgUrl !== undefined ? result[1].imgUrl : ''
          let qrImg = result[2].imgUrl !== undefined ? result[2].imgUrl : ''

          let self = this
          this.startDraw(backImg, headImg, qrImg, (imgUrl) => {
            wx.previewImage({
              urls: [imgUrl]
            })
            self.autoSavePhoto(imgUrl)
          })
        })
        .catch(() => {
          wx.hideLoading()
        })
    },

    onShareAppMessage () {
      let title = '【' + this.userInfo.nickname + '@我】' + this.content
      let imageUrl = this.shareParams.cardImg
      let path = '/pages/activity/activity-home/index?prizeId=' + this.options.prizeId

      let shareObj = {
        title: title,
        imageUrl: imageUrl,
        path: path,
        success (res) {
        },
        fail (res) {
          // 转发失败之后的回调
          if (res.errMsg === 'shareAppMessage:fail cancel') {
            // 用户取消转发
          } else if (res.errMsg === 'shareAppMessage:fail') {
            // 转发失败，其中 detail message 为详细失败信息
          }
        },
        complete: function () {

        }
      }
      return shareObj
    },

    requestAllPhotoData () {
      let backImg = this.shareParams.backImg
      let headImg = this.shareParams.headImg
      let qrImg = 'https://m.tuniucdn.com/fb2/t1/G5/M00/79/0D/Cii-s1vYHtGIRVRcAAAIihSpmnQAAP1TQP_91wAAAik743_w640_h0_c0_t0.png' // url.getMiniCode() + `?{"scene":${this.options.prizeId},"page":"pages/activity/activity-home/index"}`

      headImg = headImg && headImg !== '' ? headImg : this.shareParams.tnImg

      return Promise.all([
        uploadUtil.getPhotoInfo(backImg, true),
        uploadUtil.getPhotoInfo(headImg, true),
        uploadUtil.getPhotoInfo(qrImg, true)
      ])
    },

    startDraw (backImg, headImg, qrImg, callback) {
      var ctx = wx.createCanvasContext('share-canvas', this)

      shareUtil.setCTX(ctx)
      shareUtil.setBackImg(backImg)
      shareUtil.setHeadImg(headImg)
      shareUtil.setQrImg(qrImg)
      shareUtil.drawQRCodeImg()

      ctx.draw(false, () => {
        wx.hideLoading()
        let self = this
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375, // 325,
          height: 667, // 545,
          destWidth: 375 * 2,
          destHeight: 667 * 2,
          canvasId: 'share-canvas',
          success (res) {
            self.shareUrl = res.tempFilePath
            callback && callback(res.tempFilePath)
          },
          complete  (res) {
            self.showQRCode = false
          }
        })
      })
    },

    autoSavePhoto (imgUrl) {
      let self = this
      wx.getSetting({
        success (res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success () {
                self.savePhoto(imgUrl)
              },
              fail () {
                wx.showToast({title: '无授权', icon: 'none', duration: 1500})
              }
            })
          } else {
            self.savePhoto(imgUrl)
          }
        }
      })
    },

    savePhoto (imgUrl) {
      wx.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success (res) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
    // clickHandle (msg, ev) {
    //   console.log('clickHandle:', msg, ev)
    // }
  },

  computed: {
    userInfo () {
      return store.state.userInfo
    }
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
    store.commit('getUserInfo')
  },

  onShow () {
    this.disable = true
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

.share-back {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 0;
  position: absolute;
  top: -1000px;
}
</style>
