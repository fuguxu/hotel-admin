<template>
    <div :class="$style.product_spec">
      <el-row type="flex" :class="$style.rowWrap">
        <el-col :span="6" :class="$style.treeWrap">
            <el-tree
              :props="props"
              :load="load"
              @node-click="nodeClick"
              lazy
              :highlight-current="true"
              >
            </el-tree>
        </el-col>
        <el-col :span="18">
          <el-row class="mb-10">
            <el-form :form="query" label-width="120px">
              <el-col :span="9">
                <el-form-item label="属性名称">
                  <el-input v-model="query.attributeName"  placeholder="请输入属性名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button class="ml-10" type="primary" :disabled="!query.categoryId" @click="getData">查询</el-button>
              </el-col>
            </el-form>
          </el-row>
          <el-row>
            <el-tabs type="border-card" v-model="tab">
              <el-tab-pane v-for="item in tabs" :label="item.label" :name="item.name" :key="item.name"></el-tab-pane>
            </el-tabs>
          </el-row>
          <el-row class="mb-10 mt-15">
            <el-col :span="12">
              <el-button type="primary" :disabled="!query.categoryId" @click="create">新增</el-button>
            </el-col>
          </el-row>
          <m-table :data="tableData" :columns="columns"
          row-key="id"
          :showOperation="false"
          @handlePagination="handlePagination"
          :currentPage="currentPage" :pageSize="pageSize" :total="total">
              <template v-slot:col-attributeName="{scope}">
                <el-input :disabled="!scope.row.isEdit" v-model="scope.row.attributeName" placeholder="请输入"></el-input>
              </template>
              <template v-slot:col-operate="{scope}">
                <el-button v-if="!scope.row.isEdit" @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
                <el-button v-else type="primary" @click="operationHandler(scope.row, scope.$index, 'save')" size="mini">保存</el-button>
                <el-button @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
              </template>
          </m-table>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { saveSku, getSku, getProductCategory, getProductByParentId, deleteProduct } from '@/service/service'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: 'spu名称',
          prop: 'attributeName',
          type: 'slot'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot'
        }
      ],
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      form: {},
      query: {
        attributeName: '',
        createTime: '',
        categoryId: ''
      },
      tabs: [{ label: 'spu属性', name: 'spu' }, { label: 'sku属性', name: 'sku' }],
      tab: 'spu'
    }
  },
  created () {
  },
  methods: {
    create () {
      let obj = { ...this.query }
      Object.keys(obj).forEach(key => (obj[key] = ''))
      this.tableData.push({ ...obj, isEdit: true, createTime: this.AppUtil.dataToString(new Date()) })
    },
    async delete (row, index) {
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          return this.tableData.splice(index, 1)
        }
        let res = await deleteProduct({ id: row.id })
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    edit (row) {
      row.isEdit = true
    },
    async save (row) {
      let res = await saveSku({ ...row, categoryId: this.query.categoryId, createTime: '' })
      this.$handleRequestTip(res)
      if (res.code === 200) {
        this.getData()
      }
    },
    async getData () {
      if (!this.query.categoryId) {
        return this.$message({
          type: 'warning',
          message: '请先选择分类'
        })
      }
      let res = await getSku(this.query)
      if (res.code === 200) {
        this.tableData = (res.data ? res.data.records : []).map(item => {
          item.isEdit = false
          item.createTime = this.AppUtil.dataToString(item.createTime)
          return item
        })
        this.total = res.data.total
      }
    },
    load (node, resolve) { // 一进来就会调用load方法
      if (node.level === 0) {
        return getProductCategory().then(res => {
          resolve(res.data ? res.data.records : [])
        })
      }
      getProductByParentId({ id: node.id }).then((res) => {
        resolve(res.data || [])
      })
    },
    nodeClick (data, node, vnode) {
      this.query.categoryId = data.id
      this.getData()
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" module>
.product_spec{
  height:100%;
}
.rowWrap{
  height:100%;
}
.treeWrap{
  box-sizing: border-box;
  margin-right:20px;
  border-right: 1px solid #DCDFE6;
}
</style>
<style scoped>
  .el-tabs--border-card{
    border-bottom: none;
    box-shadow: none;
  }
  .el-tabs--border-card >>> .el-tabs__content{
    display: none;
  }
</style>
