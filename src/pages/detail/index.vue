<template>
  <div class="detail">
    <img
      alt=""
			mode="widthFix"
      :src="data.imageUrl"
      class="detail-img"
    >

    <section class="detail-textarea">{{ data.storeText }}</section>

    <section class="detail-change">
      <section
        @click="forget"
        class="detail-change__btn"
      >什么都可以忘记</section>
      <section
        @click="toEdit"
        class="detail-change__right"
      >
        <section class="detail-change__right--btn">还有什么好说的？？？</section>
      </section>
    </section>
    <!-- <card :text="logs"></card> -->
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
      disable: true,
      logs: '什么都没有呢'
    }
  },

  computed: {
    data () {
      return store.state.detailState
    }
  },

  methods: {
    forget () {
      const params = [{
        name: store.state.userInfo.nickName,
        articleId: this.data.articleId
      }]
      store.commit('getData', {
        url: 'deleteData',
        params: params,
        successFn: () => {
          store.commit('toDateil', {
            name: store.state.userInfo.nickName,
            imageUrl: this.imageUrl,
            storeText: this.storeText
          })
          const url = '../pics/main'
          wx.redirectTo({ url })
        }
      })
    },
    toEdit () {
      if (this.disable) {
        this.disable = false
        const url = '../edit/main'
        store.commit('toDateil', this.data)
        wx.redirectTo({ url })
      }
    }
  },

  onShow () {
    this.disable = true
  }
}
</script>

<style lang="less">
  .btn {
    padding: 5px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .detail {
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
      text-indent: 2em;
      margin-top: 10px;
      margin-bottom: 100px;
    }

    &-change {
      display: flex;
      font-size: 14px;

      &__btn {
        .btn;
      }

      &__right {
        flex-grow: 1;
        display: flex;
        flex-direction: row-reverse;

        &--btn {
          .btn;
        }
      }
    }
  }
</style>
