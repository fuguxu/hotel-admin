<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="4">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="11">
              <el-form-item label="用户名称">
                <el-input v-model="query.userName"  placeholder="请输入用户名称"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="登录账号">
                <el-input v-model="query.loginName"  placeholder="请输入登录账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right" :span="2">
              <el-button  type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="true"
       @operationHandler="operationHandler"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
      </m-table>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getUserByPage, deleteUserById } from '@/service/service'
const formPath = '/h/user_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '用户名称',
          prop: 'userName'
        },
        {
          label: '登录账号',
          prop: 'loginName'
        },
        {
          label: '手机号',
          prop: 'phone'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => {
            return row.status === 0 ? '正常' : '停用'
          }
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ],
      query: {
        userName: '',
        loginName: ''
      }
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
        let res = await deleteUserById([ row.userId ])
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    detail (row) {
      this.$router.push({ path: formPath,
        query: {
          id: row.userId
        }
      })
    },
    edit (row) {
      this.$router.push({ path: formPath,
        query: {
          id: row.userId,
          edit: 1
        }
      })
    },
    async getData () {
      let res = await getUserByPage({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = res.data ? res.data.records : []
        this.total = res.data.total || 0
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" module>

</style>
