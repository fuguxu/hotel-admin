<template>
    <section :class="$style['merchant-detail']">
      <el-tabs type="border-card" v-model="tab" @tab-click="tabClick">
        <el-tab-pane v-for="item in tabs" :label="item.label" :name="item.name" :key="item.name"></el-tab-pane>
      </el-tabs>
      <div :class="$style.comp">
        <keep-alive>
          <component :is="currentTabComponent"></component>
        </keep-alive>
      </div>
    </section>
</template>
<script>
import base from './base'
import info from './info'
import profile from './profile'
export default {
  data () {
    return {
      tabs: [{ label: '基本信息', name: 'base', comp: base }, { label: '账户信息', name: 'account', comp: info }, { label: '分润属性', name: 'profile', comp: profile }],
      tab: 'base'
    }
  },
  methods: {
    tabClick () {

    }
  },
  computed: {
    currentTabComponent () {
      return this.tabs.find(item => item.name === this.tab).comp
    }
  }
}
</script>

<style lang="scss" module>
  .merchant-detail{
    min-height: 100%;
    border:1px solid #E4E7ED;
    border-top: none;
    .comp{
      padding: 20px;
    }
  }
</style>
<style scoped>
  .el-tabs--border-card{
    border-bottom: none;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }
  .el-tabs--border-card >>> .el-tabs__content{
    display: none;
  }
  .el-scrollbar{
    height:100%;
  }
  .el-scrollbar >>> .el-cascader-menu__wrap {
    height: calc(100% + 20px) !important;
}
</style>
