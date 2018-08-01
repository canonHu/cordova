<template>
  <div class="detail">
    <img
      alt=""
			mode="widthFix"
      :src="data.image"
      class="detail-img"
    >

    <section
      class="detail-textarea"
      placeholder="还有那些关于这张照片的故事"
    >{{ data.store }}</section>

    <section class="detail-change">
      <section
        @click="toEdit"
        class="detail-change__btn"
      >还有什么好说的？？？</section>
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
      data: {
        image: 'https://m.tuniucdn.com/fb2/t1/G5/M00/9A/41/Cii-tFtX1qmIK2WhAAFlvzc_SLcAAKzAgFD0doAAWXX211.jpg',
        store: '那都是些什么啊'
      },
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
    toEdit () {
      const url = '../edit/main'
      store.commit('changeDetail', { detailContent: this.data })
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="less">
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
    }

    &-change {
      display: flex;
      font-size: 14px;
      flex-direction: row-reverse;

      &__btn {
        padding: 5px 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
