<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
            <el-col :span="8">
              <el-form-item label="商户名称">
                <el-input v-model="query.merchantName"  placeholder="请输入商户名称"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="公司名称">
                <el-input v-model="query.companyName"  placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right" :span="8">
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
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getAppointedUser, removeAppointedUser, appointUser } from '@/service/service'
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
          label: '商户名称',
          prop: 'merchantName'
        },
        {
          label: '登录账号',
          prop: 'companyName'
        },
        {
          label: '商户邮箱',
          prop: 'email'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ],
      query: {
        merchantName: '',
        companyName: ''
      }
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
          message: '请选择商户'
        })
      }
      this.$confirm('此操作将取消该商户的关联, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await removeAppointedUser({ roleId: this.query.roleId }, selectionDatas.map(item => item.userId))
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    async comfirm () {
      const data = this.$refs.user.getSelection()
      if (!data.length) {
        return this.$message({
          type: 'warning',
          message: '请选择商户'
        })
      }
      const res = await appointUser({ roleId: this.query.roleId }, data.map(item => item.userId))
      this.$handleRequestTip(res)
      if (res.code === 200) {
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
  }
}
</script>

<style lang="scss" module>

</style>
