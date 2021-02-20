<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="4">
          <el-button  type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="11">
              <el-form-item label="商户名称">
                <el-input v-model="query.merchantName"  placeholder="请输入商户名称"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="公司名称">
                <el-input v-model="query.companyName"  placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right" :span="2">
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
          <template v-slot:col-operate="{scope}">
            <!-- <el-button type="primary" @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">审核</el-button> -->
            <el-button type="primary" @click="operationHandler(scope.row, scope.$index, 'detail')" size="mini">明细</el-button>
          </template>
      </m-table>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getMerchantInfoByPage, removeAppointedUser } from '@/service/service'
let selectionDatas = []
const formPath = '/h/merchant_detail'
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
          label: '商户编号',
          prop: 'merchantNo'
        },
        {
          label: '商户名称',
          prop: 'merchantName'
        },
        {
          label: '公司名称',
          prop: 'companyName'
        },
        {
          label: '联系人姓名',
          prop: 'contactsName'
        },
        {
          label: '联系方式',
          prop: 'mobileNo'
        },
        {
          label: '合同日期',
          prop: 'contract',
          formatter: (row, column, cellValue, index) => {
            return (row.contractStartTime || '').slice(0, 10) + '/' + (row.contractEndTime || '').slice(0, 10)
          }
        },
        {
          label: '分销金额',
          prop: 'distributMoney'
        },
        {
          label: '冻结金额',
          prop: 'frozenMoney'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot',
          width: '100px'
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
    create () {
      this.$router.push({ path: formPath })
    },
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
    async getData () {
      let res = await getMerchantInfoByPage({
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
    },
    detail (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" module>

</style>
