<template>
    <div class="app-main-g" :class="$style['app-main']">
        <headerBar></headerBar>
        <section :class="$style['main-container']">
            <router-view></router-view>
        </section>
        <!-- <footerBar></footerBar> -->
    </div>
</template>
<script>
import headerBar from '../HeaderBar/main'
// import footerBar from '../FooterBar/main'
export default {
  data () {
    return {
      user: {name:'jack',age:18,sex:'girl',from:'china'}
    }
  },
  mounted () {
  },
  components: {
    headerBar
    // footerBar
  }
}
</script>
<style lang="scss" module>
    .app-main{
        height:100%;
    }
    .main-container{
        width:100%;
        margin:0px auto;
        min-height: 600px;
        background: #fff;
        height: calc(100% - 62px);
    }
</style>
