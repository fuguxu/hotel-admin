<template>
  <div :class="$style['side-bar']">
    <!-- <ul>
      <li v-for="(item,index) in muens" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul> -->
    <el-menu
      :default-active="defaultActive"
      :router="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2C3B48"
      text-color="#d8d4d4"
      active-text-color="#fff"
    >
      <template v-for="(item) in muens" >
        <el-submenu v-if="item.children" :key="item.path" :index="item.path">
          <template slot="title" >
            <i class="el-icon-menu"></i>
            <span >{{item.name}}</span>
          </template>
          <el-menu-item  v-for="it in (item.children)" :key="it.path" :index="it.path">{{it.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="item.path" :index="item.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      muens: []
    }
  },
  created () {
    let muenIndex = this.$route.meta.muenIndex
    let routers = this.$router.options.routes[0].children
    if (muenIndex !== undefined && routers[muenIndex].children) {
      this.muens = this.filterMuens(routers[muenIndex].children)
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    filterMuens (data) {
      return data.filter(item => {
        if (item.children) item.children = this.filterMuens(item.children)
        return item.meta.leftMuen
      })
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" module>
.side-bar {
  width: 100%;
  li a {
    line-height: 50px;
    font-size: 14px;
    padding-left: 20px;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    color: #d8d4d4;
  }
}
</style>
<style scoped>
a.router-link-active,
a:hover {
  background-color: rgba(20, 142, 245, 0.05);
  color: #fff;
}
</style>
