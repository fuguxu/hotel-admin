<template>
    <div :class="$style.product_spec">
      <el-row type="flex" :class="$style.rowWrap">
          <el-col :span="6" :class="$style.treeWrap">
            <el-scrollbar role="menu"
              class="el-cascader-menu"
              wrap-class="el-cascader-menu__wrap"
              view-class="el-cascader-menu__list">
              <el-tree
                :props="props"
                :load="load"
                @node-click="nodeClick"
                lazy
                :highlight-current="true"
                >
              </el-tree>
            </el-scrollbar>
          </el-col>
        <el-col :span="18" :class="$style.tableWrap">
          <el-row>
            <el-tabs type="border-card" v-model="tab" @tab-click="tabClick">
              <el-tab-pane v-for="item in tabs" :label="item.label" :name="item.name" :key="item.name"></el-tab-pane>
            </el-tabs>
          </el-row>
          <el-row class="mt-15">
            <el-col :span="12">
              <el-button class="ml-15" type="primary" :disabled="!query.categoryId" @click="create">新增</el-button>
            </el-col>
            <el-col :span="12" class="pr-15">
              <el-form :form="query" label-width="120px">
                <el-col :span="20">
                  <el-form-item label="属性名称">
                    <el-input v-model="query.attributeName"  placeholder="请输入属性名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button class="ml-10" type="primary" :disabled="!query.categoryId" @click="getData">查询</el-button>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
          <m-table :data="tableData" :columns="columns" :class="$style.table"
          row-key="id"
          :showOperation="false"
          @handlePagination="handlePagination"
          :currentPage="currentPage" :pageSize="pageSize" :total="total">
              <template v-slot:col-attributeName="{scope}">
                <el-input :disabled="!scope.row.isEdit" v-model="scope.row.attributeName" placeholder="请输入"></el-input>
              </template>
              <template v-slot:col-attributeValueEnum="{scope}">
                <el-input type="textarea" :disabled="!scope.row.isEdit" v-model="scope.row.attributeValueEnum" placeholder="请输入"></el-input>
              </template>
              <template v-slot:col-elementType="{scope}">
                <el-select :disabled="!scope.row.isEdit" v-model="scope.row.elementType" placeholder="请选择">
                  <el-option
                    v-for="item in elementTypeOptions"
                    :key="item.value"
                    v-bind="item">
                  </el-option>
                </el-select>
              </template>
              <template v-slot:col-operate="{scope}">
                <el-button v-if="!scope.row.isEdit" type="primary" @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
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
import { saveSku, getSku, deleteSku, saveSpu, getSpu, deleteSpu, getProductByParentId } from '@/service/service'
const KP = {
  sku: {
    columns: [
      {
        label: 'sku名称',
        prop: 'attributeName',
        type: 'slot'
      }
    ],
    save: saveSku,
    delete: deleteSku,
    getData: getSku
  },
  spu: {
    columns: [
      {
        label: 'spu名称',
        prop: 'attributeName',
        type: 'slot'
      }
    ],
    save: saveSpu,
    delete: deleteSpu,
    getData: getSpu
  }
}
const COLUMNS = [
  {
    label: '属性值',
    prop: 'attributeValueEnum',
    type: 'slot'
  },
  {
    label: '属性类型',
    prop: 'elementType',
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
]
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [],
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      query: {
        attributeName: '',
        createTime: '',
        categoryId: ''
      },
      tabs: [{ label: 'spu属性', name: 'spu' }, { label: 'sku属性', name: 'sku' }],
      tab: 'spu',
      elementTypeOptions: [
        {
          value: 'input',
          label: '输入框'
        },
        {
          value: 'select',
          label: '下拉框'
        },
        {
          value: 'check',
          label: '复选框'
        }
      ]
    }
  },
  created () {
    this.setColumns()
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
        let res = await KP[this.tab].delete({ id: row.id })
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      row.isEdit = true
    },
    async save (row) {
      let res = await KP[this.tab].save({ ...row, categoryId: this.query.categoryId, createTime: '' })
      this.$handleRequestTip(res)
      res.code === 200 && this.getData()
    },
    async getData () {
      if (!this.query.categoryId) {
        return this.$message({
          type: 'warning',
          message: '请先选择分类'
        })
      }
      let res = await KP[this.tab].getData(
        {
          ...this.query,
          pageNo: this.currentPage,
          pageSize: this.pageSize
        }
      )
      if (res.code === 200) {
        this.tableData = (res.data ? res.data.records : []).map(item => {
          item.isEdit = false
          item.createTime = this.AppUtil.dataToString(item.createTime)
          return item
        })
        this.total = res.data.total
      }
    },
    setColumns () {
      this.columns = KP[this.tab].columns.concat(COLUMNS)
    },
    load (node, resolve) { // 一进来就会调用load方法
      getProductByParentId({ id: node.level === 0 ? 0 : node.data.id }).then((res) => {
        resolve(res.data || [])
      })
    },
    tabClick (tab) {
      this.initQuery()
      this.setColumns()
      this.query.categoryId && this.getData()
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
$border-color: #DCDFE6;
.product_spec{
  height:100%;
}
.rowWrap{
  height:100%;
}
.table{
  margin:0 15px;
  padding-bottom: 15px;
}
.treeWrap{
  box-sizing: border-box;
  margin-right:20px;
  padding-top:20px;
  border: 1px solid $border-color;
  overflow-y: auto;
}
.tableWrap{
  box-sizing: border-box;
  border-right: 1px solid $border-color;
  border-left: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
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
