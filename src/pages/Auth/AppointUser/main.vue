<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
            <el-col :span="8">
              <el-form-item label="用户名称">
                <el-input v-model="query.userName"  placeholder="请输入用户名称"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="登录账号">
                <el-input v-model="query.loginName"  placeholder="请输入登录账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right" :span="8">
              <el-button   @click="add">添加用户</el-button>
              <el-button   @click="cancel">取消指派</el-button>
              <el-button  type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="false"
       @operationHandler="operationHandler"
       @selection-change="selectChange"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
      </m-table>
      <el-dialog title="选择用户"  :visible.sync="dialogFormVisible" width="80%">
        <user-table ref="user" v-if="dialogFormVisible" :inDialog="true"></user-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getAppointedUser, removeAppointedUser, appointUser } from '@/service/service'
import userTable from '@/pages/Org/User/main'
let selectionDatas = []
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          type: 'selection'
        },
        {
          label: '用户名称',
          prop: 'userName'
        },
        {
          label: '登录账号',
          prop: 'loginName'
        },
        {
          label: '用户邮箱',
          prop: 'email'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ],
      query: {
        userName: '',
        loginName: '',
        roleId: this.$route.query.roleId
      },
      dialogFormVisible: false
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    async cancel () {
      if (!selectionDatas.length) {
        return this.$message({
          type: 'warning',
          message: '请选择用户'
        })
      }
      this.$confirm('此操作将取消该用户的关联, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await removeAppointedUser({ roleId: this.query.roleId }, selectionDatas.map(item => item.userId))
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    add () {
      this.dialogFormVisible = true
    },
    async comfirm () {
      const data = this.$refs.user.getSelection()
      if (!data.length) {
        return this.$message({
          type: 'warning',
          message: '请选择用户'
        })
      }
      const res = await appointUser({ roleId: this.query.roleId }, data.map(item => item.userId))
      this.$handleRequestTip(res)
      if (res.code === 200) {
        this.dialogFormVisible = false
        this.getData()
      }
    },
    async getData () {
      let res = await getAppointedUser({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = res.data ? res.data.records : []
        this.total = res.data.total || 0
      }
    },
    selectChange (selection) {
      selectionDatas = selection
    }
  },
  components: {
    userTable
  }
}
</script>

<style lang="scss" module>

</style>
