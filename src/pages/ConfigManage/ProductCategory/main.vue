<template>
    <div class="product_category">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="12">
          <el-form :form="query" label-width="120px">
            <el-col :span="20">
              <el-form-item label="分类名称">
                <el-input v-model="query.name"  placeholder="请输入分类名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="text-right">
              <el-button  type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       row-key="id"
       :load="load"
       lazy
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-imageUrl="{scope}">
             <img :class="$style.imageUrl" :src="scope.row.imageUrl" alt="">
          </template>
          <template v-slot:col-operate="{scope}">
            <el-button type="primary" @click="operationHandler(scope.row, scope.$index, 'add')" size="mini">新增</el-button>
            <el-button @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
            <el-button @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
          </template>
      </m-table>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="上级分类名称" v-if="form.parentName">
            <el-input v-model="form.parentName" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类名称" >
            <el-input v-model="form.name" placeholder="请输入分类名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类主图">
            <m-upload v-model="form.imageUrl" dir="product/category"></m-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { saveProductCategory, getProductCategory, getProductByParentId, deleteProductCategory } from '@/service/service'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '全分类路径',
          prop: 'totalCategoryPath'
        },
        {
          label: '分类主图',
          prop: 'imageUrl',
          type: 'slot'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot'
        }
      ],
      dialogFormVisible: false,
      form: {},
      title: '',
      query: {
        name: ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    create () {
      this.add({})
    },
    async delete (row) {
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteProductCategory({ id: row.id })
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    add (row) {
      this.title = '新增分类'
      this.form = { ...row, parentName: row.name, parentId: row.id, name: '', id: '', imageUrl: '' }
      this.dialogFormVisible = true
    },
    edit (row) {
      this.title = '编辑分类'
      this.form = { ...row }
      this.dialogFormVisible = true
    },
    async comfirm () {
      let res = await saveProductCategory(this.form)
      this.$handleRequestTip(res)
      if (res.code === 200) {
        this.dialogFormVisible = false
        this.getData()
      }
    },
    async getData () {
      let res = await getProductCategory({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = this.handleData(res.data ? res.data.records : [])
        this.total = res.data.total || 0
      }
    },
    load (tree, treeNode, resolve) {
      getProductByParentId({ id: tree.id }).then((res) => {
        resolve(this.handleData(res.data || []))
      })
    },
    handleData (data) {
      return data.map((item) => {
        item.hasChildren = true
        return item
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" module>
  .imageUrl{
    width:50px;
  }
</style>
