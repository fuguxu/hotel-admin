<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="12">
          <el-button type="primary" @click="create">新增</el-button>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="false"
       @operationHandler="operationHandler"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-operate="{scope}">
            <el-button @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
            <el-button @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
          </template>
      </m-table>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="上级分类名称" v-if="form.parent_name">
            <el-input v-model="form.parent_name" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类名称" >
            <el-input v-model="form.name" placeholder="请输入分类名称" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [
        {
          brandLogo: '酒店同款',
          brandName: '阿迪达斯',
          brandUrl: 'https://www.baidu.com/',
          brandDesc: '这个品牌很不错值得信赖',
          id: 1
        }
      ],
      columns: [
        {
          label: '品牌名称',
          prop: 'brandName'
        },
        {
          label: '品牌LOGO',
          prop: 'brandLogo'
        },
        {
          label: '品牌网址',
          prop: 'brandUrl'
        },
        {
          label: '品牌描述',
          prop: 'brandDesc'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot'
        }
      ],
      dialogFormVisible: false,
      form: {},
      title: ''
    }
  },
  methods: {
    create () {
      this.add({})
    },
    operationHandler (row, index, type) {
      console.log(row, index, type)
      if (this[type]) this[type](row)
    },
    delete (row) {
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    add (row) {
      this.title = '新增分类'
      this.form = { ...row, parent_name: row.name, name: '' }
      this.dialogFormVisible = true
    },
    edit (row) {
      this.title = '编辑分类'
      this.form = row
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" module>

</style>
