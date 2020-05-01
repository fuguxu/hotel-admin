<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="12">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       row-key="id"
       :load="load"
       lazy
       :showOperation="false"
       @operationHandler="operationHandler"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-operate="{scope}">
            <el-button type="primary" @click="operationHandler(scope.row, scope.$index, 'add')" size="mini">新增</el-button>
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
let ID = 90
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [
        {
          total_catgeory_path: '酒店同款',
          name: '酒店同款',
          hasChildren: true,
          // children: [],
          id: 1
        },
        {
          total_catgeory_path: '2020上新',
          name: '2020上新',
          hasChildren: true,
          children: [
            {
              name: '客房套件',
              total_catgeory_path: '2020上新/客房套件/床单',
              id: 3,
              parent_id: 2,
              children: [
                {
                  name: '客房套件',
                  total_catgeory_path: '2020上新/客房套件/床单',
                  id: 7,
                  parent_id: 2
                }
              ]
            }, {
              name: '客房枕头',
              total_catgeory_path: '2020上新/客房枕头/枕头',
              id: 4,
              parent_id: 2
            }
          ],
          id: 2
        },
        {
          total_catgeory_path: '居家生活',
          name: '居家生活',
          hasChildren: true,
          // children: [],
          id: 5
        }
      ],
      columns: [
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '全分类路径',
          prop: 'total_catgeory_path'
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
    },
    load (tree, treeNode, resolve) {
      this.loadData = [
        {
          name: '王小',
          total_catgeory_path: '上海市普陀区金沙江路',
          hasChildren: true,
          id: ID++
        }, {
          name: '王虎',
          total_catgeory_path: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true,
          id: ID++
        }
      ]
      // setTimeout(() => {
      resolve(
        this.loadData
      )
      console.log(tree, treeNode)
      // }, 1000)
    }
  }
}
</script>

<style lang="scss" module>

</style>
