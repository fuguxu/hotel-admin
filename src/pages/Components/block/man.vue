<template>
  <div :class="$style.content">
    <div :class="$style.header">{{title}}</div>
    <div :class="$style.slot">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: ''
    }
  }
</script>
<style lang="scss" module>
  .content {
    border: 1px solid #E4E7ED;
    .header {
      line-height: 40px;
      height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #E4E7ED;
      padding-left: 20px;
      font-size: 14px;
    }
    .slot {
      padding: 10px;
    }
  }
</style>
