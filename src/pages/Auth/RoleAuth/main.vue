<template>
  <section class="product_brand_detail">
    <form-header>授权管理</form-header>
    <el-row >
      <el-col :span="24" :class="$style['tree_col']">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="resId"
          default-expand-all
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps">
        </el-tree>
      </el-col>
      <el-col :span="24">
        <div class="text-center mt-10">
            <el-button v-if="isEdit" @click="save" type="primary">保存</el-button>
            <el-button v-else @click="edit" type="primary">编辑</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { roleAuthorize, getAuthorizedRes } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        projectKey: ''
      },
      defaultProps: {
        children: 'children',
        label: 'resName'
      },
      treeData: [],
      isEdit: false,
      defaultCheckedKeys: []
    }
  },
  methods: {
    async save () {
      const resDtos = this.$refs.tree.getCheckedNodes().map(item => {
        return {
          appKey: item.appKey,
          resId: item.resId
        }
      })
      let res = await roleAuthorize({
        ...this.$route.query,
        resDtos
      })
      this.$handleRequestTip(res)
      res.code === 200 && this.goBack()
    },
    getDefaultCheckedKeys (data) {
      for (let val of data) {
        val.selected && this.defaultCheckedKeys.push(val.resId)
        val.children && this.getDefaultCheckedKeys(val.children)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    async getData () {
      let res = await getAuthorizedRes({ projectKey: this.$route.query.projectKey, roleId: this.$route.query.roleId })
      if (res.code === 200) {
        const data = res.data || []
        this.getDefaultCheckedKeys(data)
        this.treeData = data
      }
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.getData()
  },
  computed: {
  },
  components: {
    formHeader: header
  }
}
</script>

<style lang="scss" module>
  .tree_col{
    border: 1px solid #EBEEF5;
    border-top: none;
    padding: 10px 0px;
  }
</style>
