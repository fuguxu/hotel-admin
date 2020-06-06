<template>
    <div :class="$style['form_header']">
      <h4 :class="$style.title"><slot></slot></h4>
      <div :class="$style.right"><slot name="rightItem"></slot></div>
    </div>
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
  .form_header{
    border-bottom: 1px solid #EBEEF5;
    padding:10px 0px;
    display: flex;
  }
  .title{
    font-size: 20px;
  }
  .right{
    flex: 1;
    text-align: right;
  }
</style>
