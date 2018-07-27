<template>
  <div>
    <card :text="logs"></card>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: '什么都没有呢'
    }
  }
}
</script>

<style lang="less">
</style>
