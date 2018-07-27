<template>
  <div class="counter-warp">
    <section class="we-love">
      逆着光行走，仍风吹雨打
    </section>

    <section class="pics">
      <section
        :key="index"
        class="pics-item"
        @click="change"
        v-for="(item, index) in list"
      >
        <image mode="widthFix" class="pics-item__zp" :src="item" />
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        '/static/images/1.jpg',
        '/static/images/2.png',
        '/static/images/3.jpg',
        '/static/images/4.jpg'
      ]
    }
  },

  methods: {
    change () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    }
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
