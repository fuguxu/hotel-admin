<template>
    <div :class="$style['portal']">
        <div :class="$style['side-bar-content']">
            <SideBar></SideBar>
        </div>
        <div :class="$style['portal-content']">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import SideBar from '../SideBar/main'
export default {
  data () {
    return {

    }
  },
  components: {
    SideBar
  }
}
</script>
<style lang="scss" module>
    .portal{
        // min-height: 600px;
        min-height: 100%;
        display: flex;
    }
    .side-bar-content{
      width:240px;
      background: #2C3B48;
    }
    .portal-content{
        background: #fff;
        width:calc(100% - 240px);
        flex: 1;
        box-sizing: border-box;
        padding:20px;
    }
</style>
