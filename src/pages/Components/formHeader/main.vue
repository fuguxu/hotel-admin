<template>
    <div :class="$style['form_header']">
      <h4 :class="$style.title"><slot></slot></h4>
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
  }
  .title{
    font-size: 20px;
    padding:10px 0px;
  }
</style>
