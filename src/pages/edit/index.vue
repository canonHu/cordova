<template>
  <div class="edit">
    <img
      alt=""
      v-if="imageUrl"
      :src="imageUrl"
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
      :value="storeText"
      v-model="storeText"
      class="edit-textarea"
      placeholder="还有那些关于这张照片的故事"
    ></textarea>

    <section class="edit-change">
      <section
        @click="toDetail"
        class="edit-change__btn"
      ><!-- 哪还有那么些故事好讲 -->如果说够了的话</section>
    </section>
  </div>
</template>

<script>
import store from '../../store'

export default {

  data () {
    return {
      disable: true,
      imageUrl: '',
      storeText: '',
      articleId: '',
      url: ''
    }
  },

  computed: {
    detailState () {
      const detailState = store.state.detailState
      this.articleId = detailState.articleId !== undefined ? detailState.articleId : ''
      this.imageUrl = detailState.imageUrl !== undefined ? detailState.imageUrl : ''
      this.storeText = detailState.storeText !== undefined ? detailState.storeText : ''
      this.url = this.articleId ? 'updateData' : 'addData'
    }
  },

  methods: {
    successFn (state) {
      if (state.ok) {
        store.commit('getData', {
          url: 'findData',
          params: {},
          successFn: () => {
            store.commit('toDateil', {
              name: store.state.userInfo.nickName,
              imageUrl: this.imageUrl,
              storeText: this.storeText
            })
            if (this.disable) {
              this.disable = false
              const url = '../detail/main'
              wx.redirectTo({ url })
            }
          }
        })
      }
    },

    toDetail (item) {
      const params = [{
        name: store.state.userInfo.nickName,
        imageUrl: this.imageUrl,
        storeText: this.storeText,
        articleId: this.articleId
      }]
      store.commit('getData', {
        url: this.url,
        params,
        successFn: this.successFn
      })
    },

    getImage () {
      wx.chooseImage({
        success: (res) => {
          const tempFilePaths = res.tempFilePaths
          const uploadTask = wx.uploadFile({
            url: 'https://www.canonhu.top/uploadImages',
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            formData: {
              user: 'test'
            },
            success: (res) => {
              this.imageUrl = tempFilePaths[0]
              // do something
            }
          })

          uploadTask.onProgressUpdate((res) => {
            // console.log('上传进度', res.progress)
            // console.log('已经上传的数据长度', res.totalBytesSent)
            // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
          })
        }
      })
    }
  },

  onShow () {
    this.disable = true
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
