<template>
  <div>
    <card :text="logs"></card>
    <view @click="getImage">12345</view>
  </div>
</template>

<script>
import store from '../../store'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: '什么都没有呢'
    }
  },

  computed: {
    count () {
      console.log(store.state.count)
      return store.state.count
    }
  },

  methods: {
    getImage () {
      wx.chooseImage({
        success: (res) => {
          const tempFilePaths = res.tempFilePaths
          const uploadTask = wx.uploadFile({
            url: 'http://172.31.84.74:3000/uploadImages',
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            formData: {
              user: 'test'
            },
            success: (res) => {
              console.log(res)
              // do something
            }
          })

          uploadTask.onProgressUpdate((res) => {
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
