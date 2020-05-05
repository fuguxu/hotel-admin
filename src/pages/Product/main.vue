<template>
    <section :class="$style.product">
      <router-view></router-view>
    </section>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" module>
  .product{
    height:100%;
  }
</style>
