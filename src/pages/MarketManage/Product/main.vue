<template>
    <div class="select_product_category">
      <div :class="$style['selected-item']">
        <span>已选类目:</span>
        <span v-html="pathLabels"></span>
      </div>
      <el-cascader-panel ref="cascader" :props="props" @change="changeNode" ></el-cascader-panel>
      <div :class="$style['btn']">
        <el-button :disabled="!pathLabels" @click="nextStep" type="primary">下一步，发布商品</el-button>
      </div>
    </div>
</template>
<script>
import { getProductByParentId } from '@/service/service.js'
import pagination from '@/mixins/pagination'
export default {
  mixins: [pagination],
  data () {
    return {
      props: {
        value: 'id',
        label: 'name',
        lazy: true,
        leaf: 'isLeaf',
        lazyLoad: this.lazyLoad
      },
      selectedNode: [],
      query: {
        storeName: ''
      }
    }
  },
  created () {
  },
  methods: {
    async lazyLoad (node, resolve) {
      getProductByParentId({ id: node.root ? 0 : node.value }).then((res) => {
        resolve(res.data || [])
      })
    },
    changeNode (node) {
      this.selectedNode = this.$refs.cascader.getCheckedNodes()
    },
    nextStep () {
      this.$router.push({
        path: '/h/product_detail',
        query: {
          path: this.selectedNode[0].data.totalCategoryPath,
          id: this.selectedNode[0].value
        }
      })
    }
  },
  computed: {
    pathLabels () {
      let node = this.selectedNode[0]
      return !node ? '' : node.pathLabels.map(path => {
        return `<span class="selected-path">${path}</span>`
      }).join(' > ')
    }
  }
}
</script>

<style lang="scss" module>
  .selected-item{
    border:1px solid #E4E7ED;
    padding: 10px 0 25px 10px;
    margin-bottom:15px;
    background-color: #F5F7FA;
  }
  .btn{
    text-align: center;
    padding:40px 0px;
  }
</style>
<style  scoped>
  .select_product_category >>> .selected-path  {
    color: #409EFF;
  }
</style>
