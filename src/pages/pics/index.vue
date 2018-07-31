<template>
  <div class="counter-warp">
    <section class="we-love">
      {{ yoursMood }}
    </section>

    <section class="pics">
      <section
        :key="index"
        class="pics-item"
        @click="change"
        v-for="(item, index) in loveList"
      >
        <image mode="widthFix" class="pics-item__zp" :src="item" />
      </section>
    </section>
  </div>
</template>

<script>
import store from '../../store'
export default {
  data () {
    return {
      loveList: []
    }
  },

  computed: {
    yoursMood () {
      return store.state.yoursMood
    }
  },

  methods: {
    change () {
      const url = '../detail/main'
      wx.navigateTo({ url })
    }
  },

  created () {
    this.loveList.push('http://www.canonhu.top:5000/love/love1.jpg')
  }
}

</script>
<style lang="less">
.counter-warp {
  text-align: center;
}

.we-love {
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 20px;
}

.pics {
  display: flex;
  padding: 0 10px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  &-item {
    width: 100%;

    &__zp {
      width: 100%;
      display: block;
      margin-bottom: 10px;
    }
  }
}

</style>
