<template>
  <div :class="$style.app" class="beauty-scroll-bar">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'hello world'
    }
  }
}
</script>
<style lang="scss" module>
.app {
  height: 100%;
}
</style>
