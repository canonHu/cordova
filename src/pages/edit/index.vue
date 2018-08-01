<template>
  <div class="edit">
    <img
      alt=""
      v-if="image || detailContent.image"
      :src="image || detailContent.image"
			mode="widthFix"
      class="edit-img"
      @click="getImage"
    >
    <section
      v-else
      @click="getImage"
      class="edit-addimg"
    >添加一张有故事的图片</section>

    <textarea
      class="edit-textarea"
      :value="detailContent.store"
      placeholder="还有那些关于这张照片的故事"
    ></textarea>

    <section class="edit-change">
      <section
        @click="toDetail"
        class="edit-change__btn"
      >哪还有那么些故事好讲</section>
    </section>
  </div>
</template>

<script>
import store from '../../store'

export default {

  data () {
    return {
      logs: '什么都没有呢',
      image: ''
    }
  },

  computed: {
    detailContent () {
      // console.log(store.state.detailContent)
      return store.state.detailContent
    }
  },

  methods: {
    toDetail (item) {
      // const url = '../detail/main'
      wx.navigateBack(1)
    },
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
              this.image = tempFilePaths[0]
              console.log(res, tempFilePaths)
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
  },

  watch: {
    detailContent (newValue) {
      console.log(newValue)
      // store.commit('changeDetail', {
      //   image: this.image || newValue.image || '',
      //   store: newValue.store
      // })
    }
  }
}
</script>

<style lang="less">
  .edit {
    padding: 20px;

    &-img {
      width: 100%;
    }

    &-addimg {
      width: 100%;
      height: 200px;
      font-size: 20px;
      text-align: center;
      line-height: 200px;
      color:rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    &-textarea {
      width: auto;
      padding: 10px;
      font-size: 14px;
      margin-top: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    &-change {
      display: flex;
      font-size: 14px;
      margin-top: 10px;
      justify-content: center;

      &__btn {
        padding: 5px 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
