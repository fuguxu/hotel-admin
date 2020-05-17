<template>
    <div class="select_product_category">
      <el-cascader-panel ref="cascader" :props="props" @change="changeNode" ></el-cascader-panel>
      <div :class="$style['selected-item']">
        <span>已选类目:</span>
        <span v-html="pathLabels"></span>
      </div>
      <div :class="$style['btn']">
        <el-button type="primary">下一步，发布商品</el-button>
      </div>
    </div>
</template>
<script>
import { getProductCategory, getProductByParentId } from '@/service/service.js'
import pagination from '@/mixins/pagination'
export default {
  mixins: [pagination],
  data () {
    return {
      props: {
        value: 'id',
        label: 'name',
        lazy: true,
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
    async initData () {
      let res = await getProductCategory()
      return res.data ? res.data.records : []
    },
    async lazyLoad (node, resolve) {
      if (node.root) {
        resolve(await this.initData())
      } else {
        getProductByParentId({ id: node.value }).then((res) => {
          resolve(res.data || [])
        })
      }
    },
    changeNode (node) {
      this.selectedNode = this.$refs.cascader.getCheckedNodes()
    }
  },
  computed: {
    pathLabels () {
      let node = this.selectedNode[0]
      if (!node) {
        return ''
      } else {
        return node.pathLabels.map(path => {
          return `<span class="selected-path">${path}</span>`
        }).join(' > ')
      }
    }
  }
}
</script>

<style lang="scss" module>
  .selected-item{
    border:1px solid #E4E7ED;
    padding: 10px 0 25px 10px;
    margin-top:15px;
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
