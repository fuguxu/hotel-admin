<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="4">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       row-key="id"
       :load="load"
       lazy
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-operate="{scope}">
            <el-button type="primary"  @click="operationHandler(scope.row, scope.$index, 'add')" size="mini">新增</el-button>
            <el-button  @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
            <el-button @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
          </template>
      </m-table>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getChildDept, getRootDept, deleteDeptById } from '@/service/service'
const formPath = '/h/dept_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '部门名称',
          prop: 'deptName'
        },
        {
          label: '邮箱',
          prop: 'email'
        },
        {
          label: '负责人',
          prop: 'leader'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => {
            return row.status === 1 ? '正常' : '停用'
          }
        },
        {
          label: '联系电话',
          prop: 'phone'
        },
        {
          label: '操作',
          prop: 'operate',
          width: '220px',
          type: 'slot'
        }
      ]
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    create () {
      this.$router.push({ path: formPath })
    },
    async delete (row) {
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteDeptById([ row.id ])
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    add (row) {
      this.$router.push({ path: formPath,
        query: {
          parentId: row.id,
          orgNo: row.orgNo
        }
      })
    },
    edit (row) {
      this.$router.push({ path: formPath,
        query: {
          id: row.id,
          edit: 1
        }
      })
    },
    async getData () {
      let res = await getRootDept()
      if (res.code === 200) {
        this.tableData = this.handleData(res.data ? res.data : [])
        this.total = res.data.total || 0
      }
    },
    load (tree, treeNode, resolve) {
      getChildDept({ parentId: tree.id }).then((res) => {
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

</style>
